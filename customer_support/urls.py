from django.urls import path, re_path
from .import views


app_name = 'customer_support'


urlpatterns = [
    path('', views.index, name= 'index'),
    path('test/', views.test, name= 'test'),     #(?:session_id=(?P<session_id>[a-z0-9])/)?$
    path('test1/', views.test1, name= 'test'),     #(?:session_id=(?P<session_id>[a-z0-9])/)?$
    path('product_list/', views.product_list, name= 'product_list'),
    path('admin_product_list/', views.admin_product_list, name= 'admin_product_list'),
    path('client_product_list/', views.client_product_list, name= 'client_product_list'),
    re_path(r'^room_list/(?P<product>[0-9\w-]+)/(?P<organization_id>[0-9\w-]+)', views.room_list, name= 'room_list'),# room_list for provided product

    re_path(r'^dowell-api/create-room/(?P<product>[0-9\w-]+)/(?:session_id=(?P<session_id>[a-z0-9])/)?$', views.create_room_API, name= 'create-room-API'),    #    create room API without login -
    re_path(r'^chat/(?P<product>[0-9\w-]+)/(?:session_id=(?P<session_id>[a-z0-9])/)?$', views.chat_box_view, name='chat-box'),  # login and extension
    path('send/<int:pk>/', views.send_message_api, name= 'send_message'),

    # login urls start here
    path('create-portfolio-mobile/', views.create_portfolio_mobile, name='create-portfolio-mobile'), # after login mobile application - used by muzahid application
    #   path('create-portfolio/', views.create_portfolio, name='create-portfolio'),     #   ?session_id=jhufy8yea89aef
    re_path(r'^d-chat/(?P<product>[0-9\w-]+)/(?:session_id=(?P<session_id>[a-z0-9])/)?$', views.create_room_api__dowell_user, name= 'create-room-API-loggedin'),    #    create room API for logged in user
    path('send_message/<int:pk>/', views.send_msg_api_3, name= 'send_message_3'),



    path('customer-support/', views.admin_support_page_view, name='support-page'),  # entry - ?session_id=huiy87th68t86r8tgg86ug86

    path('main-support/', views.main_support_page, name='main-support-page'),

    path('living-lab-support/', views.living_lab_support_view, name='living-lab-support'),      ## entry - ?session_id=huiy87th68t86r8tgg86ug86

    path('main-living-lab-support/', views.main_living_lab_support_page, name='main-living-lab-support-page'),

    path('api/create-portfolio/', views.create_portfolio_mobile2, name='create-portfolio2'),

]

'''
    In web support-page
            - 12 GET (product-list/)
            - 23 GET and POST(send_message )
    astrey
            - 12 GET 'product_list/,
            - 15 GET (product - 'sales-agent')
            - 17 GET and POST (send )
    Muzahid
            - 12 GET (product-list/)
            - 20 POST 'create-portfolio-mobile/',
            - 23 GET and POST (send_message )

    product chat(workflow-ai, other)
            - 22 GET (d-chat/<product>/?session_id=jiisadijio8u9dujsf
            - 23 GET and POST (send_message )


    '''




#
#   https://ll04-finance-dowell.github.io/100018-dowellWorkflowAi-testing/#/?session_id=wvpouhbr4ov07bf3yfhyoziucz4roi8d&id=100093