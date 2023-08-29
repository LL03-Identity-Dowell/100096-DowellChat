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
    def create_room(self, user_id, org_id, product_name,portfolio_name):
        message = {"receiver":'How may I help you'}
        data = {
            "user_id": user_id,
            "org_id": org_id,
            "product_name": product_name,
            "portfolio_name": portfolio_name,
            "message": message
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
                response = self.create_room(user_id, org_id, product_name, portfolio_name)
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

class createOpenChatRoom(RoomService):
    def post(self, request):
        user_id = request.data.get('user_id')
        product_name = request.data.get('product_name')
        org_id = generate_room_id(product_name, user_id)
        org_id = org_id['room_name']
        portfolio_name = user_id
        room_name = request.data.get('room_name')

        if room_name == 'openchat' and product_name == 'SALESAGENT':
            response=self.create_room(user_id, org_id, product_name, portfolio_name)
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
        elif room_name == 'openChat' and product_name == 'LOGIN':
            response=self.create_room(user_id, org_id, product_name, portfolio_name)
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


    




