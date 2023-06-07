from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt


from django.urls import reverse

from .models import Portfolio, Room, Message
from django.contrib.auth import REDIRECT_FIELD_NAME
from functools import wraps
import json
import requests

from django.views.decorators.clickjacking import xframe_options_exempt





#   You can write your views below here
def jsonify_message_object(mess_obj):
    return (
        {
            'id': mess_obj.id,
            'timestamp' : mess_obj.timestamp.isoformat(timespec='minutes') ,
            'room_id' : mess_obj.room_id,
            'read': mess_obj.read,
            'message': mess_obj.message,
            'message_type': mess_obj.message_type,
            'side': mess_obj.side,
            'author' : {
                'id': mess_obj.author.id,
                'session_id':mess_obj.author.session_id
            }
        }
    )


def no_login_portfolio_control(_id, product):
    """ Without login """
    _id = _id.replace("-", "").replace(":","").replace(".","").replace(" ","")
    try:
        portfolio = Portfolio.objects.get(session_id=_id)
    except Portfolio.DoesNotExist:
        portfolio = Portfolio.objects.create( portfolio_name=_id, session_id=_id)

    room = Room.objects.filter(sender_portfolio__id=portfolio.id, product=product.lower()).order_by('id').first()
    if not room :
        room = Room.objects.create(
            room_name=portfolio.portfolio_name,
            room_id= portfolio.session_id,
            sender_portfolio=portfolio,
            product=product.lower()
        )
        room.save()

    messages = Message.objects.filter(room=room)
    if len(messages) == 0 :
        Message.objects.create(
            room=room,
            message="Hey, How may I help you?",
            author=portfolio,
            read=True,
            side=True,
            message_type="TEXT"
        )
        messages = Message.objects.filter(room=room)
    return portfolio.id, room.id, messages




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
                        portfolio = Portfolio.objects.get(userID=request.session["dowell_user"]["userinfo"]["userID"], organization=request.session["dowell_user"]["portfolio_info"][0]["org_id"])
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


def test1(request):
    return JsonResponse({"status":"it is working"})


@xframe_options_exempt
def index(request):
    return render(request, 'index.html')


def portfolio_control(d_user, session_id, is_staff):
    try:
        portfolio = Portfolio.objects.get(userID=d_user["userinfo"]["userID"], organization = d_user["portfolio_info"][0]["org_id"])
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
    room = Room.objects.filter(sender_portfolio__id=portfolio.id, product=product.lower(), company=portfolio.organization).order_by('id').first()
    if not room :
        room = Room.objects.create(
            room_name=portfolio.portfolio_name,
            room_id= portfolio.session_id,
            sender_portfolio=portfolio,
            company=portfolio.organization,
            product=product.lower()
        )
        room.save()
    messages = Message.objects.filter(room=room)
    return room, messages




from django.views.decorators.csrf import csrf_exempt


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
            p = Portfolio.objects.get(userID = request.POST.get('user_id') or body.get('user_id'),  organization = request.POST.get('org_id') or body.get('org_id'))
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




@csrf_exempt
def create_portfolio_mobile_API(request):
    """
    Api for creating portfolio for logged in users
    currently used in mobile application only
    """
    session_id = request.GET.get('session_id', None)
    url = 'https://100014.pythonanywhere.com/api/userinfo/'
    response = requests.post(url, data={'session_id': session_id})

    try:
        response=response.json()
    except:
        return HttpResponse(response.text)#    JsonResponse({ 'error': 'Wrong session_id', 'login_response': response.text }) #   print("response : ", response)

    if response["userinfo"]["username"]:
        try:
            portfolio = Portfolio.objects.get(userID=response["userinfo"]["userID"], organization = response["portfolio_info"][0]["org_id"])
            portfolio.session_id = session_id
            portfolio.save()
        except:
            p = Portfolio.objects.create(
                portfolio_name = response["userinfo"]['username'],
                session_id = session_id,
                userID = response["userinfo"]['user_id'],
                organization = response["portfolio_info"][0]["org_id"],
                #is_staff = True,
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
        return JsonResponse({ "error": "User not found." })





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
    org_id = None
    portfolio = Portfolio.objects.none()
    print("PK :", pk)
    room = Room.objects.get(id=int(pk))
    if request.method == "POST" :
        message = request.POST.get('message')
        user_id = request.POST.get('user_id')
        message_type = request.POST.get('message_type')
        org_id = request.POST.get('org_id')
        try:
            body = request.body.decode('utf8').replace("'", '"')
            message = json.loads(body)['message']
            user_id = json.loads(body)['user_id']
            message_type = json.loads(body)['message_type']
            org_id = json.loads(body)['org_id']
        except:
            pass

    print("Send Message 3 : ", user_id , " - ", org_id, "message : ", message, request.POST)
    if user_id:
        if message :
            try:
                msg_type = message_type if message_type else "TEXT"
                portfolio = Portfolio.objects.get(userID=str(user_id), organization=str(org_id))
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




@xframe_options_exempt
def pop_up_api(request, *args, **kwargs):
    return render(request, 'index.html', {'product': kwargs['product'].lower(), 'session_id': request.GET['session_id']})



ADMIN_PRODUCT = ["Login", "Extension", "Living-Lab-Admin", "Sales-Agent"]

PRODUCT_LIST = ["Workflow-AI", "Wifi-QR-Code", "Legalzard", "User-Experience-Live", "Social-Media-Automation", "Living-Lab-Scales", "Logo-Scan", "Team-Management", "Living-Lab-Monitoring", "Permutation-Calculator", "Secure-Repositories", "Secure-Data", "Customer-Experience", "DoWell-CSC", "Living-Lab-Chat"]


def product_list(request):
    return JsonResponse({"product_list": [*ADMIN_PRODUCT, *PRODUCT_LIST]})


def admin_product_list(request):
    return JsonResponse({"product_list": [*ADMIN_PRODUCT]})

def client_product_list(request):
    return JsonResponse({"product_list": [*PRODUCT_LIST]})


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
        'session_id': session_id,
        'organization_id': portfolio.organization
    })


@dowell_login_required
def admin_support_page_view(request, *args, **kwargs):
    return redirect(reverse('customer_support:main-support-page'))

def main_support_page(request, *args, **kwargs):
    return render(request, 'customer_support_chat_1.html', support_context(request.session["dowell_user"], request.session['session_id'], ADMIN_PRODUCT, False))

def test3(request):
    var = support_context(dowell_user, request.session['session_id'], ADMIN_PRODUCT, False)
    


@dowell_login_required
def living_lab_support_view(request, *args, **kwargs):
    return redirect(reverse('customer_support:main-living-lab-support-page'))

def main_living_lab_support_page(request, *args, **kwargs):
    return render(request, 'customer_support_chat_1.html', support_context(request.session["dowell_user"], request.session['session_id'], PRODUCT_LIST, True))




#   @dowell_login_required
def room_list(request, *agrs, **kwargs):
    firstroom = None
    rooms = None
    rm_list = []
    try:
        if kwargs['product'].lower() == 'login' or kwargs['product'].lower() == 'sales-agent' or kwargs['product'].lower() == 'extension' :
            rooms = Room.objects.filter(product=kwargs['product'].lower()).order_by("-id")
        else:
            rooms = Room.objects.filter(product=kwargs['product'].lower(), company=kwargs['organization_id']).order_by("-id")
        print('room API product : ', kwargs['product'])
        if rooms:
            for r in rooms:
                if r.active :
                    url = 'https://100093.pythonanywhere.com/api/userinfo/'
                    response = requests.post(url, data={'session_id': r.sender_portfolio.session_id})
                    response = response.json()
                    if response['userinfo'].get('profile_img'):
                        profile_img  = response['userinfo']['profile_img']
                    else:
                        profile_img = "No profile image"   
                    rm_list.append({'room_id': r.id, 'room_name': r.room_name, 'company': r.company, 'r_session': r.room_id,"userinfo":{"userID":r.sender_portfolio.userID,"portfolio_name":r.sender_portfolio.portfolio_name, "profile_img":profile_img }})
            try:
                firstroom = rm_list[0]
            except:
                firstroom = {'room_id': None, 'room_name': '', 'company': ''}
        frm_id = firstroom['room_id'] if firstroom else None
        return JsonResponse({'rooms': rm_list, 'firstroom': firstroom, 'messages': [jsonify_message_object(message) for message in Message.objects.filter(room_id=frm_id)]})
    except Room.DoesNotExist:
        return JsonResponse({'rooms': []})






'''
@dowell_login_required
def create_portfolio(request):
    """
    Api for creating portfolio for logged in users
    currently not been in use
    """
    p = portfolio_control(request.session["dowell_user"], request.GET.get("session_id"), False)
    return JsonResponse({
        "status": 200,
        "portfolio": {
            "portfolio_name": p.portfolio_name,
            "userID": p.userID,
            "organization": p.organization
        }
    })




@xframe_options_exempt
@dowell_login_required
def chat_popup_view(request, *args, **kwargs):
    """
    sender side handling for iframe with dowell login
    url  = 100096.pythonanywhere.com/extension-chat/Extension/?session_id=ta9n001ggjjgofc6ocfcprqjhq0a3h6b&prdct=Workflow-AI
    """
    portfolio = portfolio_control(request.session["dowell_user"], request.GET['session_id'])
    room, messages = room_control(portfolio, kwargs['product'].lower())
    if kwargs['product'].lower() == 'extension':
        room.sub_product = request.GET.get('prdct')
        room.save()
    return render(
        request,
        'chat_box.html',
        {
            'session_id': request.GET['session_id'],
            'product': kwargs['product'].lower(),
            'portfolio': portfolio,
            'messages': messages,
            'room_pk': room.id
        }
    )

@xframe_options_exempt
def chat_box_userinfo_view(request, *args, **kwargs):
    context = {}
    session_id = request.GET.get('session_id')
    url = 'https://100093.pythonanywhere.com/api/userinfo/'
    response = requests.post(url, data={'session_id': session_id})
    response=response.json()
    print("login :", response)
    try:
        portfolio = Portfolio.objects.get(user_id=response['userinfo']['username'])
    except:
        portfolio = Portfolio.objects.create(
            portfolio_name=response["userinfo"]["username"],
            session_id=request.GET.get('session_id'),
            username = response["userinfo"]["username"],
            email = response["userinfo"]["email"],
            phone = response["userinfo"]["phone"],
            userID = response["userinfo"]["userID"],
            organization = response["portfolio_info"][0]["org_id"]
        )

    room = Room.objects.filter(authority_portfolio__id=portfolio.id, product=kwargs['product'].lower(), company=response["portfolio_info"][0]["org_id"]).first()
    if not room :
        room = Room.objects.create(
            room_name=portfolio.portfolio_name,
            room_id= portfolio.userID,
            product=kwargs['product'].lower(),
            authority_portfolio = portfolio,
            company=response["portfolio_info"][0]["org_id"],
        )
        room.save()
        messages = Message.objects.filter(room=room)
        context = {'session_id': request.GET['session_id'], 'product': kwargs['product'], 'portfolio': portfolio, 'messages': messages, 'room_pk': room.id}
    return render(request, 'chat_box.html', context)









def room_details(request, room_id, **kwargs):
    ##  portfolio = Portfolio.objects.get(id=room_id)
    try:
        room = Room.objects.get(id=room_id)
        messages = Message.objects.filter(room=room)
    except Room.DoesNotExist:
        return JsonResponse({'message': 'room does not exist.'})
    return render(request, 'room.html', { 'messages': messages, 'room_': room.jsonify_room})



    try:
        portfolio = Portfolio.objects.filter(userID=request.session["dowell_user"]["userinfo"]["userID"]).order_by("-id")[0]
    except Portfolio.DoesNotExist:
        portfolio = Portfolio.objects.create(
            portfolio_name=request.session["dowell_user"]["userinfo"]["username"],
            session_id=request.session["session_id"],
            username = request.session["dowell_user"]["userinfo"]["username"],
            email = request.session["dowell_user"]["userinfo"]["email"],
            phone = request.session["dowell_user"]["userinfo"]["phone"],
            userID = request.session["dowell_user"]["userinfo"]["userID"],
            organization = request.session["dowell_user"]["portfolio_info"][0]["org_id"],
            dowell_logged_in = True
        )
    room = Room.objects.filter(authority_portfolio__id=portfolio.id, product=kwargs['product'].lower()).first()
    if not room :
        room = Room.objects.create(
            room_name=portfolio.portfolio_name,
            room_id= portfolio.session_id,
            authority_portfolio=portfolio,
            product=kwargs['product'].lower()
        )
        room.save()





# This is new msg api with dowell login
def login_check(session_id):
    url = 'https://100093.pythonanywhere.com/api/userinfo/'
    response = requests.post(url, data={'session_id': session_id})
    try:
        response=response.json()
        if response["userinfo"]["username"]:
            return response
    except:
        return JsonResponse({'status': False, 'error': 'Wrong session_id'})




@csrf_exempt
@dowell_login_required
def send_msg_api_2(request, pk):
    message = str()
    #   session_id = None
    print("PK :", pk)
    room = Room.objects.get(pk=int(pk))
    if request.POST :
        message = request.POST.get('message')
        #   session_id = request.POST.get('session_id')
        message_type = request.POST.get('message_type')

    else:
        try:
            body = request.body.decode('utf8').replace("'", '"')
            message = json.loads(body)['message']
            #   session_id = json.loads(body)['session_id']
            message_type = json.loads(body)['message_type']
        except:
            pass
        print("Session_id :", request.session["session_id"] , ", message : ", message, request.POST)

    if request.session["session_id"]:
        if message :
            try:
                portfolio = Portfolio.objects.filter(userID=request.session["dowell_user"]["userinfo"]["userID"]).order_by("-id")[0]
                msg = Message.objects.create(
                    room=room,
                    message=message,
                    author=portfolio,
                    read=False,
                    side=False if room.room_name == portfolio.portfolio_name else True,
                    message_type=message_type
                )
                msg.save()
            except Portfolio.DoesNotExist:
                return JsonResponse({'Error': '404', 'messages': 'Wrong session id user Not found.'})
    messages = Message.objects.filter(room=room)
    message_list = [jsonify_message_object(message) for message in messages]
    return JsonResponse({'portfolio': session_id, 'messages': message_list, 'room_pk': room.id})





@dowell_login_required
def support_page_view(request, *agrs, **kwargs):
    try:
        portfolio = Portfolio.objects.get(session_id=kwargs['session_id'])
    except Portfolio.DoesNotExist:
        portfolio = Portfolio.objects.create(
            portfolio_name=kwargs['session_id'],
            session_id=kwargs['session_id']
        )

    #   room = Room.objects.filter(authority_portfolio__id=portfolio.id).first()

    rooms = Room.objects.all()
    for room in rooms:
        messages = Message.objects.filter(room=room)
        if len(messages) == 0:
            room.delete()


    rooms = Room.objects.all()
    firstroom = Room.objects.all().first()
    messages = Message.objects.all()


    return render(request, 'support_chat_box.html', {'firstroom': firstroom, 'portfolio': portfolio, 'rooms': rooms, 'messages': messages, 'session_id': kwargs['session_id']})



def user_room_list(request, *args, **kwargs):
    prdct = kwargs['product']
    try:
        rooms = Room.objects.filter(product=prdct.lower())
    except Room.DoesNotExist:
        return JsonResponse({'rooms': None})
    rm = []
    for r in rooms:
        if r.active :
            rm.append({'room_id': r.id, 'room_name': r.room_name, 'company': r.company})
    return JsonResponse({'rooms': rm })


@csrf_exempt
def main(request):
    session_id = request.GET.get("session_id", None)
    if session_id:
        field = {"SessionID": session_id}
        response = dowellconnection(*SESSION_ARGS, "fetch", field, "nil")
        res = json.loads(response)
        if res["isSuccess"]:
            request.session["session_id"] = res["data"][0]["SessionID"]
            print("Res------------- \n",res["data"])
        fields = {"Username": res["data"][0]["Username"]}
        response = dowellconnection(*REGISTRATION_ARGS, "fetch", fields, "nil")
        usrdic = json.loads(response)
        if usrdic["isSuccess"]:
            print("User Role :", usrdic["data"][0]["Role"])
            request.session["Role"] = usrdic["data"][0]["Role"]
            try:
                request.session["company_id"] = usrdic["data"][0]["company_id"]
            except:
                request.session["company_id"] = None
            request.session["user_name"] = usrdic["data"][0]["Username"]
            print("LoggedIn as : ", usrdic["data"][0])
            return redirect("documentation:home")  #   HttpResponse("hello")
        else:
            return (
                redirect_to_login()
            )  #   return redirect("https://100014.pythonanywhere.com/?code=100084")
    else:
        return redirect_to_login()



def support_chat_view(request, *args, **kwargs):
    try:
        portfolio = Portfolio.objects.get(session_id=kwargs['session_id'])
    except Portfolio.DoesNotExist:
        portfolio = Portfolio.objects.create(
            portfolio_name=kwargs['session_id'],
            session_id=kwargs['session_id']
        )

    #   room = Room.objects.filter(authority_portfolio__id=portfolio.id).first()

    rooms = Room.objects.all()
    for room in rooms:
        messages = Message.objects.filter(room=room)
        if len(messages) == 0:
            room.delete()


    rooms = Room.objects.all()
    firstroom = Room.objects.all().first()
    messages = Message.objects.all()
    return JsonResponse({'status': 200, 'room': room, 'messages': messages})




class HomeView(ListView):
    model = Portfolio
    template_name = 'home_page.html'


#django post request
@csrf_exempt
def post(request):
    if request.method == 'POST':
        print(request.POST)
        return redirect('index')
    else:
        print('is a get request')
        return render(request, 'index.html')




# GET and POST method for sending and receiving messages in room
def send_message(request, pk):
    message = request.POST.get('message')
    room = Room.objects.get(pk=pk)
    Message.objects.create(
        room=room,
        message=message,
        author=room.authority_portfolio
    )
    messages = Message.objects.filter(author=room.authority_portfolio)
    return render(request, 'room.html', {'portfolio': portfolio, 'messages': messages, 'room_pk': room.pk})

'''