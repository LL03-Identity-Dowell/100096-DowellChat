from django.urls import path
from .views import *

urlpatterns = [
    # ""chat Internal API""
    path('', health_check.as_view()),
    path('room-service/', RoomService.as_view()),
    path('room-control/', RoomController.as_view()),
    path('room-list/', RoomList.as_view()),
    path('openChatRoom/', createOpenChatRoom.as_view()),

    # ""  QR code API methods""
    path('create_master_link/', QRServiceHandler.as_view(), name='create_master_link'),
    path('get_QR_Id/<str:org_id>/', QRServiceValidationHandler.as_view(), name='get_QR_Id'),
    path('init/<str:org_id>/<str:product_name>/<str:user_id>/', QRServiceValidationHandler.as_view(), name='validate-public-link'),

    path('publicroom/', PublicCreateRoom.as_view()),

    # ""  Sales_agent code API methods""
    path('create-enquiry', Enquiry.as_view(), name='create-enquiry'),
    path('referal', SaleAgentRefer.as_view(), name='referal'),

    path('admin-enquiry', AdminEnquiry.as_view()),
    path('admin-referral', AdminSaleAgentRefer.as_view()),


]