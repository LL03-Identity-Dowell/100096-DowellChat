from django.shortcuts import render
from channels.layers import get_channel_layer



# notification view 
def notification_view(request):
    return render(request, 'notifications/index.html', {
        'room_name': "broadcast"
    })


from asgiref.sync import async_to_sync
from django.shortcuts import HttpResponse

def test(request):
    channel_layer=get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "notification_broadcast",
        {
            'type': 'send_notification',
            'message': json.dumps("Notification")

        }
    )
    return HttpResponse("Done")
