from django.urls import path
from .views import *

urlpatterns = [
    path('', health_check.as_view()),
    path('room-service/', room_service.as_view()),
    path('room-service/', room_service.as_view()),

]