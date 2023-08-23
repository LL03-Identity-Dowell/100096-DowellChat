from django.urls import path
from .views import *

urlpatterns = [
    path('', health_check.as_view()),
    path('room-service/', RoomService.as_view()),
    path('room-control/', RoomController.as_view()),
    path('room-list/', RoomList.as_view()),


]