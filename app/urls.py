from django.urls import path
from .views import *

urlpatterns = [
    path('', health_check.as_view()),
    path('room-service/', RoomService.as_view()),
    path('room-control/', RoomController.as_view()),
    path('room-list/', RoomList.as_view()),


    
    # path('create_master_link/', QRServiceHandler.as_view(), name='create_master_link'),
    # path('api/v3/init/<str:company>/<str:event>/<str:link_id>/', QRServiceValidationHandler.as_view(), name='validate-public-link'),



]