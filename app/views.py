from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from .serializers import *
import pdb

from .helper import *
from .constant import *

@method_decorator(csrf_exempt, name='dispatch')
class health_check(APIView):
    def get(self, request ):
        return Response("if your are seeing this then , server is !down",status=status.HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class RoomService(APIView):
    def post(self, request):
        type_request = request.data.get('type')
        
        if type_request == "create_message":
            return self.create_message(request)
        elif type_request == "delete_room":
            return self.delete_room(request)
        else:
            return self.handle_error(request)
        
    def get(self, request):
        type_request = request.GET.get('type')

        if type_request == "get_room_by_id":
            return self.get_room_by_id(request)
        elif type_request == "get_messages":
            return self.get_messages(request)
        else:
            return self.handle_error(request)
        
    """CREATE ROOM SERVICE"""
    def create_room(self, user_id, org_id, product_name,portfolio_name, isLogin = False, public_QR=False):
        message = {"receiver":'How may I help you'}
        data = {
            "user_id": user_id,
            "org_id": org_id,
            "product_name": product_name,
            "portfolio_name": portfolio_name,
            "message": message,
        }

        serializer = CreateRoomServiceSerializer(data=data)
        if serializer.is_valid():
            room_name = generate_room_id(data["product_name"], user_id)
            field = {
                "eventId": get_event_id()["event_id"],
                "user_id": data["user_id"],
                "org_id": data["org_id"],
                "portfolio_name": data["portfolio_name"],
                "room_room_id": room_name["room_name"],
                "product_name": data["product_name"],
                "message": data["message"],
                "isLogin": isLogin,
                "is_active": True,
            }
            response =  dowellconnection(*room_services, "insert", field, update_field=None)
            response = json.loads(response)
            if response["isSuccess"]:
                return {
                    "success": True,
                    "message": "Room created successfully",
                    "inserted_id": response["inserted_id"],
                    "response": field
                }
            else:
                return{
                    "success": False,
                    "message": "Failed to create room",
                }
        else:
            return Response({
                "success": False,
                "message": "Posting wrong data to API",
                "error": serializer.errors
            },status=status.HTTP_400_BAD_REQUEST)

    
    """GET ROOM BY ID"""
    def get_room_by_id(self, request):
        room_id = request.GET.get('room_id')

        field = {
            "_id": room_id
        }

        print(room_id)
        response = json.loads(dowellconnection(*room_services, "find", field, update_field= None))
        return Response({
            "success": True,
            "message": "Room deatils based on org_id",
            "response": response["data"],
        })
    
    """update message ROOM BY ID"""

    def create_message(self, request):
        type = request.data.get('type')
        room_id = request.data.get('room_id')
        message_data = request.data.get('message_data')
        side = request.data.get('side')
        author = request.data.get('author')
        message_type = request.data.get('message_type')
        data = {
            "type": type,
            "room_id": room_id,
            "message_data": message_data,
            "side": side,
            "author": author,
            "message_type": message_type,
        }
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            field = {
                "room_id": room_id,
                "message_data": message_data,
                "side": side,
                "author": author,
                "message_type": message_type,
                "read": True,
            }     
            response = json.loads(dowellconnection(*chat, "insert", field, update_field=None))
            return Response({
                "success": True,
                "message": "Message updated successfully",
                "response": response,
            })
        else:
            return Response({
                "success": False,
                "message": "Invalid data",
                "errors": serializer.errors,
            }, status=status.HTTP_400_BAD_REQUEST)
        
    """get message ROOM BY ID"""
    def get_messages(self, request):
        room_id = request.GET.get('room_id')
        field = {
            "room_id": room_id
        }
        response = json.loads(dowellconnection(*chat, "fetch", field, update_field= None))
        return Response({
            "success": True,
            "message": "Room deatils based on org_id",
            "response": response,
        })

    
    
    """Delete message ROOM BY ID"""
    
    def delete_room(self,request,):
        room_id = request.data.get('room_id')
        message_data = request.data.get('is_active')
        field = {
            "_id": room_id,
        }
        update_field = {
            "is_active": message_data
        }       
        response = json.loads(dowellconnection(*room_services, "update", field, update_field= update_field))
        return Response({
            "success": True,
            "message": "Room deleted successfully",
            "response": response,
        })

    """HANDLE ERROR"""
    def handle_error(self, request): 
        return Response({
            "success": False,
            "message": "Invalid request type"
        }, status=status.HTTP_400_BAD_REQUEST)
    

class RoomController(RoomService):
    def post(self, request):
        user_id = request.data.get('user_id')
        org_id = request.data.get('org_id')
        product_name = request.data.get('product_name')
        portfolio_name = request.data.get('portfolio_name')
        response = self.roomFilter(user_id, org_id, product_name, portfolio_name)
        if response:
            return Response({
                "success": True,
                "message": "Room filter successfully",
                "inserted_id": response[0]["_id"],
                "response": response[0]
            })
        else:
            try:
                response = self.create_room(user_id, org_id, product_name, portfolio_name, isLogin = True)
                if response:
                    return Response({
                        "success": True,
                        "message": "Room created successfully",
                        "inserted_id": response["inserted_id"],
                        "response": response['response']
                    })
                
            except Exception as e:
                return Response({
                        "success": False,
                        "message": "Failed to create room",
                    })
    

    def roomFilter(self,user_id, org_id, product_name, portfolio_name):
        field = {
            "user_id": user_id,
            'org_id': org_id,
            'product_name': product_name,
            'portfolio_name': portfolio_name,
            'is_active': True
        }

        response = json.loads(dowellconnection(*room_services, "fetch", field, update_field= None)) 
        return response["data"]


class RoomList(APIView):
    """GET ROOM BY SERVER SIDE""" 
    def get(self, request):
        org_id = request.GET.get('org_id')
        product_name= request.GET.get('product_name')


        field = {
            "org_id": org_id,
            "product_name": product_name
        }

        response_data = json.loads(dowellconnection(*room_services, "fetch", field, update_field= None))
        if 'data' in response_data and len(response_data['data']) > 0:
            last_id = response_data['data'][-1]["_id"]
            last_room_response =  self.get_room_by_id(last_id)
            return Response({
            "success": True,
            "message": "Room deatils based on org_id",
            "response": response_data["data"],
            "last_room_details": last_room_response["response"]
        })
        else:
            
            return Response({
            "success": False,
            "message": "Room not found on org_id",
        })
    def get_room_by_id(self, room_id):

        field = {
            "_id": room_id
        }

        print(room_id)
        response = json.loads(dowellconnection(*room_services, "find", field, update_field= None))
        return{
            "success": True,
            "message": "Room deatils based on org_id",
            "response": response["data"],
        }

class createOpenChatRoom(RoomController):
    def post(self, request):
        user_id = request.data.get('user_id')
        product_name = request.data.get('product_name')
        org_id = generate_room_id(product_name, user_id)
        org_id = org_id['room_name']
        portfolio_name = user_id
        isLogin = False
        response = self.roomFilter(user_id, org_id, product_name, portfolio_name)
        if response:
            return Response({
                "success": True,
                "message": "Room filter successfully",
                "inserted_id": response[0]["_id"],
                "response": response[0]
            })
        else:
            response=self.create_room(user_id, org_id, product_name, portfolio_name, isLogin)
            if response:
                return Response({
                    "success": True,
                    "message": "Room created successfully",
                    "inserted_id": response["inserted_id"],
                    "response": response['response']
                })
            else:
                return Response({
                    "success": False,
                    "message": "Failed to create room",
                })
        

@method_decorator(csrf_exempt, name='dispatch')
class QRServiceHandler(APIView):
    def get(self, request, *args, **kwargs):
        rooms = self.room_filter(workspace_id=kwargs['workspace_id'])
        return Response({'rm_s': rooms})

    def post(self, request, *args, **kwargs):
        workspace_id = str(request.POST.get(['workspace_id']))
        QR_ids = list(request.POST.get('qr_ids'))  #  #  [secrets.token_hex(16) for i in range(3)]  # Generate a random string of 16 characters
        event_name = '-'.join(request.POST.get('event-name').replace(":","").replace(".","").split(' '))

        r_event = self.event_controller({ 'name' : event_name, 'workspace_id': workspace_id, 'room_count': len(QR_ids) })
        print("Event :", r_event)
        links = list()
        for qr_hash in QR_ids:
            rm_link = self.get_httpURL(qr_hash, r_event.event_name.lower(), workspace_id)
            links.append(rm_link)

        save_response = json.loads(self.save_links_2mgdb(workspace_id, links, r_event.event_name.lower()))

        return Response({
                'e':r_event.event_name, 
                'qr_response': save_response['response'],
            }
        )

    def create_event(self, event_name, room_count, workspace_id):
        data = {
            "workspace_id": workspace_id,
            "event_name": event_name,
            "room_count": room_count
        }

        serializer = CreateEventServiceSerializer(data=data)
        if serializer.is_valid():
            print("Event data parsed successfully")
            
            field = {
                "eventId": get_event_id()["event_id"],
                "workspace_id": data["workspace_id"],
                "event_name": data["event_name"],
                "room_count": data["room_count"],
                "is_active": True,
            }

            response =  dowellconnection(*event_services, "insert", field, update_field=None)
            print("response",response)
            if response["isSuccess"]:
                return {
                    "success": True,
                    "message": "Event created successfully",
                    "inserted_id": response["inserted_id"],
                    "response": json.loads(response)
                }
            else:
                return{
                    "success": False,
                    "message": "Failed to create event",
                }
        else:
            return {
                "success": False,
                "message": "Posting wrong data to API",
                "error": serializer.errors
            }

    def room_filter(self, workspace_id):
        field = {
            'workspace_id': workspace_id,
            'public_QR': True
        }

        response = json.loads(dowellconnection(*room_services, "fetch", field, update_field= None)) 
        return response["data"]

    def get_httpURL(self, qr_id, event, workspace_id):
        return f'https://100096.pythonanywhere.com/api/v3/init/{workspace_id}/{event}/{qr_id}/' 
    
    def save_links_2mgdb(company_id, links, job_name):
        url = "https://www.qrcodereviews.uxlivinglab.online/api/v3/qr-code/"
        
        payload = {
            "qrcode_type": "Link",
            "quantity": 1,
            "company_id": company_id,
            "links": links,
            "document_name":job_name
        }
        response = requests.post(url, json=payload)

        return response.text


    def get_event_by_details(self, event_name, workspace_id):
        field = {
            "event_name": event_name,
            'workspace_id': workspace_id,
        }

        response = json.loads(dowellconnection(*event_services, "fetch", field, update_field= None))
        return response["data"]

    def update_event_by_id(self, event_id, data):
        field = {
            "_id": event_id,
        }
        update_field = {
            **data
        }       
        response = json.loads(dowellconnection(*event_services, "update", field, update_field= update_field))
        return response


    def event_controller(self, event):
        ev_response = None
        ev = self.get_event_by_details(event['name'], event['workspace_id'])
        if ev['isSuccess']:
            field = {
                'room_count': ev['data']['room_count'] + event['room_count'],   #room_count += len(QR_ids)
            }
            ev_response = self.update_event(ev['data']['_id'], field)
        else:
            ev_response = self.create_event(event_name=event['name'], room_count=event['room_count'], workspace_id=['workspace_id'])      #   event = RoomEvent.objects.create(event_name=event_name, room_count=len(QR_ids), organization=company_id)        #   num_links = int(request.POST.get('your-surname'))
        return ev_response



from django.http import JsonResponse
class QRServiceValidationHandler(QRServiceHandler, RoomService):
    def get(self,request, *args, **kwargs):
        room_create_response = self.create_room(kwargs['link_id'], kwargs['workspace_id'], kwargs['event'], kwargs['link_id'], isLogin=False, public_QR=True)
        print("ROOM :", room_create_response)
        try:
            return JsonResponse({'room': room_create_response})
        except:
            return room_create_response
        