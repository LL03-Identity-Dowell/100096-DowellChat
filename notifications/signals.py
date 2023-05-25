from django.db.models.signals import post_save
from django.dispatch import receiver
from customer_support.models import Message
from .models import Notification
from channels.layers import get_channel_layer 
from asgiref.sync import async_to_sync
from django.conf import settings
import json

@receiver(post_save,sender=Message)
def update_notification(sender,instance,created, **kwargs):
    if created:
        total_unread_messages=Message.objects.filter(read=False).count()
        notification=Notification.objects.first()
        if  not notification:
            notification=Notification.objects.create()
        notification.total_unread_messages=total_unread_messages
        notification.save()


        channel_layer=get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "notification_broadcast",
            {
                'type': 'send_notification',
                'message': json.dumps(notification.total_unread_messages)
            }
        )


   