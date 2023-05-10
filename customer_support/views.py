from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .helper import *
from django.urls import reverse

from .models import Portfolio, Room, Message
from django.contrib.auth import REDIRECT_FIELD_NAME
from functools import wraps
import json
import requests
from django.views.decorators.clickjacking import xframe_options_exempt



def create_room_API(request, *args, **kwargs):
    """
    Views that are used for user that are not logged-in
    mobile API view handle
    """
    if kwargs['product'].lower() != 'sales-agent':
        return JsonResponse({'error': 'Unauthorized access prohibitted.'})

    if len(request.GET['session_id']) < 8:
        return JsonResponse({'error': 'request must contain 8 char long session_id.'})

    portfolio, room, messages = no_login_portfolio_control(request.GET['session_id'], kwargs['product'].lower())
    message_list = [jsonify_message_object(message) for message in messages]

    return JsonResponse({
        'session_id': request.GET['session_id'],
        'product': kwargs['product'].lower(),
        'portfolio': portfolio,
        'messages': message_list,
        'room_pk': room
    })




@xframe_options_exempt
def chat_box_view(request, *args, **kwargs):
    """
    Views that are used for user that are not logged-in
    view handle, used via iframe tag

    """
    portfolio, room, messages = no_login_portfolio_control(request.GET['session_id'], kwargs['product'].lower())

    return render(
        request,
        'chat_box.html',
        {
            'session_id': request.GET['session_id'],
            'product': kwargs['product'].lower(),
            'portfolio': portfolio,
            'messages': messages,
            'room_pk': room
        }
    )





@csrf_exempt
def send_message_api(request, pk):
    """
    Views that are used for user that are not logged-in
    GET and POST API method for sending and receiving messages in room
    """
    message = str()
    session_id = str()
    message_type = str()
    room = Room.objects.get(pk=int(pk))
    if request.POST :
        message = request.POST.get('message')
        session_id = request.POST.get('session_id').replace("-", "").replace(":","").replace(".","").replace(" ","")
        message_type = request.POST.get('message_type')
    else:
        try:
            body = json.loads(request.body.decode('utf8').replace("'", '"'))
            message = body['message']
            session_id = body['session_id'].replace("-", "").replace(":","").replace(".","").replace(" ","")
            message_type = body['message_type']
        except:
            pass
        print("Session_id :", session_id , ", message : ", message, request.POST)
    if message :
        try:
            msg_type = message_type if message_type else "TEXT"
            portfolio = Portfolio.objects.get(session_id=session_id)
            msg = Message.objects.create(
                room=room,
                message=message,
                author=portfolio,
                read=False,
                side=False,
                message_type=msg_type
            )
            msg.save()
        except Portfolio.DoesNotExist:
            return JsonResponse({'Error': '404', 'messages': 'portfolio Not found.'})

    messages = Message.objects.filter(room=room)
    message_list = [jsonify_message_object(message) for message in messages]
    return JsonResponse({'portfolio': session_id, 'messages': message_list, 'room_pk': room.id})





#   LOGIN views start here

def user_passes_test(test_func, login_url='https://100014.pythonanywhere.com/?code=100096', redirect_field_name=REDIRECT_FIELD_NAME):
    def decorator(view_func):
        @wraps(view_func)
        def rt_wrapper(request, *args, **kwargs):
            session_id = request.GET.get("session_id", None)
            if session_id:
                url = 'https://100093.pythonanywhere.com/api/userinfo/'
                response = requests.post(url, data={'session_id': session_id})

                try:
                    response=response.json()
                except:
                    return HttpResponse(response.text)#    JsonResponse({ 'error': 'Wrong session_id', 'login_response': response.text }) #   print("response : ", response)

                if test_func(response["userinfo"]["username"]):
                    request.session["session_id"] = session_id
                    request.session["dowell_user"] = response

                    try:
                        portfolio = Portfolio.objects.get(userID=request.session["dowell_user"]["userinfo"]["userID"])
                        portfolio.session_id = session_id
                        portfolio.save()
                    except:
                        pass
                    return view_func(request, *args, **kwargs)
            else:
                if request.session["session_id"]:
                    return view_func(request, *args, **kwargs)
        return rt_wrapper
    return decorator



def dowell_login_required(function=None, redirect_field_name=REDIRECT_FIELD_NAME, login_url='https://100014.pythonanywhere.com/?code=100096'):
    actual_decorator = user_passes_test(
        lambda is_True: is_True,
        login_url=login_url,
        redirect_field_name=redirect_field_name,
    )
    if function:
        return actual_decorator(function)
    return actual_decorator



@dowell_login_required
def test(request):
    print("Logged in as: ", request.session["dowell_user"]["userinfo"]["username"])
    return JsonResponse({"status":"it is working", "session_id": request.session["dowell_user"]["userinfo"]["username"]})



@xframe_options_exempt
def index(request):
    return render(request, 'index.html')


def portfolio_control(d_user, session_id, is_staff):
    try:
        portfolio = Portfolio.objects.get(userID=d_user["userinfo"]["userID"])
    except Portfolio.DoesNotExist:
        portfolio = Portfolio.objects.create(
            portfolio_name = d_user["userinfo"]["username"],
            session_id = session_id,
            userID = d_user["userinfo"]["userID"],
            organization = d_user["portfolio_info"][0]["org_id"],
            is_staff = is_staff,
            dowell_logged_in = True
        )
        portfolio.save()
    return portfolio


def room_control(portfolio, product):
    room = Room.objects.filter(authority_portfolio__id=portfolio.id, product=product.lower(), company=portfolio.organization).order_by('id').first()
    if not room :
        room = Room.objects.create(
            room_name=portfolio.portfolio_name,
            room_id= portfolio.session_id,
            authority_portfolio=portfolio,
            company=portfolio.organization,
            product=product.lower()
        )
        room.save()
    messages = Message.objects.filter(room=room)
    return room, messages






@csrf_exempt
def create_portfolio_mobile(request):
    """
    Api for creating portfolio for logged in users
    currently used in mobile application only
    """
    if request.method == "POST" :
        #   username, session_id, user_id, org_id
        print(request.body)
        try:
            body = json.loads(request.body.decode('utf8').replace("'", '"')) #
        except:
            body = {}

        try:
            p = Portfolio.objects.get( userID = request.POST.get('user_id') or body.get('user_id') )
        except Portfolio.DoesNotExist:
            p = Portfolio.objects.create(
                portfolio_name = request.POST.get('username') or body.get('username'),
                session_id = request.POST.get('session_id') or body.get('session_id'),
                userID = request.POST.get('user_id') or body.get('user_id'),
                organization = request.POST.get('org_id') or body.get('org_id'),
                is_staff = True,
                dowell_logged_in = True
            )
            p.save()
        return JsonResponse({
            "status": 200,
            "portfolio": {
                "portfolio_name": p.portfolio_name,
                "userID": p.userID,
                "organization": p.organization
            }
        })
    else:
        return JsonResponse({ "error": "Method not allowed." })




@dowell_login_required
def create_room_api__dowell_user(request, *args, **kwargs):
    """
    sender side API handling for dowell logged in users
    url  = 100096.pythonanywhere.com/d-chat/<product>/?session_id=<session_id>
    """
    session_id = request.GET.get('session_id')
    d_user = request.session["dowell_user"]
    print("Product get args: ", session_id, kwargs['product'].lower(), d_user)

    portfolio = portfolio_control(d_user, session_id, False)
    room, messages = room_control(portfolio, kwargs['product'].lower())

    return JsonResponse({
        'product': kwargs['product'].lower(),
        'portfolio': portfolio.id,
        'messages': [jsonify_message_object(message) for message in messages],
        'room_pk': room.id,
        'user_id': portfolio.userID
    })







@csrf_exempt
def send_msg_api_3(request, pk):
    """
    GET and POST message API handling for dowell logged in user
    """
    message = str()
    message_type = str()
    user_id = None
    portfolio = Portfolio.objects.none()
    print("PK :", pk)
    try:
        room = Room.objects.get(id=int(pk))
        if request.method == "POST" :
            message = request.POST.get('message')
            user_id = request.POST.get('user_id')
            message_type = request.POST.get('message_type')
            try:
                body = request.body.decode('utf8').replace("'", '"')
                message = json.loads(body)['message']
                user_id = json.loads(body)['user_id']
                message_type = json.loads(body)['message_type']
            except:
                pass

        print("Session_id :", user_id , ", message : ", message, request.POST)
        if user_id:
            if message :
                try:
                    msg_type = message_type if message_type else "TEXT"
                    portfolio = Portfolio.objects.get(userID=user_id)
                    msg = Message.objects.create(
                        room=room,
                        message=message,
                        author=portfolio,
                        read=False,
                        side=portfolio.is_staff,
                        message_type=msg_type
                    )
                    msg.save()
                except Portfolio.DoesNotExist:
                    return JsonResponse({'Error': '404', 'messages': 'Wrong user_id, user Not found.'})
        messages = Message.objects.filter(room=room)
        return JsonResponse({'messages': [jsonify_message_object(message) for message in messages], 'room_pk': room.id})
    except:
        return JsonResponse({'messages': "no room Id exit"})




@xframe_options_exempt
def pop_up_api(request, *args, **kwargs):
    return render(request, 'index.html', {'product': kwargs['product'].lower(), 'session_id': request.GET['session_id']})



ADMIN_PRODUCT = ["Login", "Extension", "Living-Lab-Admin", "Sales-Agent"]

PRODUCT_LIST = ["Workflow-AI", "Wifi-QR-Code", "User-Experience-Live", "Social-Media-Automation", "Living-Lab-Scales", "Logo-Scan", "Team-Management", "Living-Lab-Monitoring", "Permutation-Calculator", "Secure-Repositories", "Secure-Data", "Customer-Experience", "DoWell-CSC", "Living-Lab-Chat"]


def product_list(request):
    return JsonResponse({"product_list": [*ADMIN_PRODUCT, *PRODUCT_LIST]})


def support_room_control(product, org, company_filter):
    rooms = Room.objects.all()
    messages = Message.objects.none()
    for room in rooms:
        messages = Message.objects.filter(room=room)
        if len(messages) <= 1:
            room.delete()

    if company_filter:
        rooms = Room.objects.filter(product=product.lower(), company=org).order_by("-id")
    else:
        rooms = Room.objects.filter(product=product.lower()).order_by("-id")

    if len(rooms) :
        messages = Message.objects.filter(room=rooms[0].id)
    return rooms, messages


def support_context(d_user, session_id, product_list, company_filter):
    portfolio = portfolio_control(d_user, session_id, True)
    rooms, messages = support_room_control(product_list[0].lower(), portfolio.organization, company_filter)
    return ({
        'product_list': product_list,
        'firstroom': rooms.first(),
        'portfolio': portfolio,
        'rooms': rooms,
        'messages': messages,
        'session_id': session_id
    })


@dowell_login_required
def admin_support_page_view(request, *args, **kwargs):
    return redirect(reverse('customer_support:main-support-page'))

def main_support_page(request, *args, **kwargs):
    return render(request, 'customer_support_chat_.html', support_context(request.session["dowell_user"], request.session['session_id'], ADMIN_PRODUCT, False))


@dowell_login_required
def living_lab_support_view(request, *args, **kwargs):
    return redirect(reverse('customer_support:main-living-lab-support-page'))

def main_living_lab_support_page(request, *args, **kwargs):
    return render(request, 'customer_support_chat_.html', support_context(request.session["dowell_user"], request.session['session_id'], PRODUCT_LIST, True))




#   @dowell_login_required
def room_list(request, *agrs, **kwargs):
    firstroom = None
    rooms = None
    rm_list = []
    try:
        rooms = Room.objects.filter(product=kwargs['product'].lower()).order_by("-id")
        print('room API product : ', kwargs['product'])
        if rooms:
            for r in rooms:
                if r.active :
                    rm_list.append({'room_id': r.id, 'room_name': r.room_name, 'company': r.company})
            try:
                firstroom = rm_list[0]
            except:
                firstroom = {'room_id': None, 'room_name': '', 'company': ''}
        frm_id = firstroom['room_id'] if firstroom else None
        return JsonResponse({'rooms': rm_list, 'firstroom': firstroom, 'messages': [jsonify_message_object(message) for message in Message.objects.filter(room_id=frm_id)]})
    except Room.DoesNotExist:
        return JsonResponse({'rooms': []})


