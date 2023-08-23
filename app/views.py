from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .serializers import *
from .helper import *
from .constant import *

@method_decorator(csrf_exempt, name='dispatch')
class health_check(APIView):
    def get(self, request ):
        return Response("if your are seeing this then , server is !down",status=status.HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class room_service(APIView):
    def post(self, request):
        type_request = request.GET.get('type')

        if type_request == "create_room":
            return self.create_room(request)
        elif type_request == "get_rooms_by_workspace_id":
            return self.get_rooms_by_workspace_id(request)
        elif type_request == "update_message_room":
            return self.update_message_room(request)
        else:
            return self.handle_error(request)
        
    def get(self, request):
        type_request = request.GET.get('type')

        if type_request == "get_room_by_id":
            return self.get_room_by_id(request)
        else:
            return self.handle_error(request)
        
    """CREATE ROOM SERVICE"""
    def create_room(self, request):
        user_id = request.data.get('user_id')
        workspace_id = request.data.get('workspace_id')
        product_name = request.data.get('product_name')
        portfolio_name = request.data.get('portfolio_name')
        message = request.data.get('message')

        data = {
            "user_id": user_id,
            "workspace_id": workspace_id,
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
                "workspace_id": data["workspace_id"],
                "portfolio_name": data["portfolio_name"],
                "room_room_id": room_name["room_name"],
                "product_name": data["product_name"],
                "message": data["message"],
                "is_active": True,
            }
            response =  json.loads(dowellconnection(*room_services, "insert", field, update_field=None))
            if response["isSuccess"]:
                return Response({
                    "success": True,
                    "message": "Room created successfully",
                    "inserted_id": response["inserted_id"],
                    "response": field
                })
            else:
                return Response({
                    "success": False,
                    "message": "Failed to create room",
                })
        else:
            return Response({
                "success": False,
                "message": "Posting wrong data to API",
                "error": serializer.errors
            },status=status.HTTP_400_BAD_REQUEST)

    """GET ROOM BY SERVER SIDE""" 
    def get_rooms_by_workspace_id(self, request):
        workspace_id = request.GET.get('workspace_id')

        field = {
            "workspace_id": workspace_id
        }

        response = json.loads(dowellconnection(*room_services, "fetch", field, update_field= None))
        return Response({
            "success": True,
            "message": "Room deatils based on workspace id",
            "response": response["data"],
        })
    
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
            "message": "Room deatils based on workspace id",
            "response": response["data"],
        })
    
    """update message ROOM BY ID"""
    
    def update_message_room(self,request,):
        room_id = request.GET.get('room_id')
        message = request.data.get('message')

        field = {
            "_id": room_id,
        }
        update_field = message

        response = json.loads(dowellconnection(*room_services, "update", field, update_field= update_field))
        return Response({
            "success": True,
            "message": "Message updated successfully",
            "response": response["data"],
        })

    """HANDLE ERROR"""
    def handle_error(self, request): 
        return Response({
            "success": False,
            "message": "Invalid request type"
        }, status=status.HTTP_400_BAD_REQUEST)
    

