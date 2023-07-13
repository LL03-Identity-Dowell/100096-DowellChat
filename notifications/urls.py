from django.urls import path
from . import views

app_name= 'notifications'

urlpatterns= [
    path('', views.notification_view, name='notifications'),
]