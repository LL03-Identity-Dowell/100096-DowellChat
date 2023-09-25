async_mode = None

from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import HttpResponse
from app.serializers import *
from app.helper import *
from app.constant import *
from rest_framework.response import Response

#Socket imports
import socketio
import os
sio = socketio.Server(cors_allowed_origins="*", async_mode=async_mode)
thread = None


# Create your views here.

@api_view(['GET'])
def index(request):
    global thread
    if thread is None:
        thread = sio.start_background_task(background_thread)
    # return HttpResponse(open(os.path.join(basedir, 'static/index.html')))
    return HttpResponse('Hello')

def background_thread():
    count = 0
    while True:
        sio.sleep(10)
        count += 1
        sio.emit('my_response', {'data': 'Server generated event'},
                 namespace='/test')
        

@sio.event
def message_event(sid, message):
    type = message['type']
    room_id = message['room_id']
    message_data = message['message_data']
    side = message['side']
    author = message['author']
    message_type = message['message_type']
    
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
        return sio.emit('my_response', {'data': message['message_data'], 'sid':sid})
    else:
        return sio.emit('my_response', {'data': 'Invalid Data', 'sid':sid})

    
        
@sio.event
def disconnect_request(sid):
    sio.disconnect(sid)


message={
    'data':"Hello Everyone"
}
@sio.event
def connect(sid, environ):
    # messages = Message.objects.all()
    # serializer = MessageSerializer(messages, many = True)
    sio.emit('my_response', {'data': message['data'], 'count': 0}, room=sid)


@sio.event
def disconnect(sid):
    print('Client disconnected')


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