from .models import *
#   You can write your views below here
def jsonify_message_object(mess_obj):
    return (
        {
            'id': mess_obj.id,
            'timestamp' : mess_obj.timestamp.isoformat(timespec='minutes') ,
            'room_id' : mess_obj.room_id,
            'read': mess_obj.read,
            'message': mess_obj.message,
            'message_type': mess_obj.message_type,
            'side': mess_obj.side,
            'author' : {
                'id': mess_obj.author.id,
                'session_id':mess_obj.author.session_id
            }
        }
    )


def no_login_portfolio_control(_id, product):
    """ Without login """
    _id = _id.replace("-", "").replace(":","").replace(".","").replace(" ","")
    try:
        portfolio = Portfolio.objects.get(session_id=_id)
    except Portfolio.DoesNotExist:
        portfolio = Portfolio.objects.create( portfolio_name=_id, session_id=_id)

    room = Room.objects.filter(authority_portfolio__id=portfolio.id, product=product.lower()).order_by('id').first()
    if not room :
        room = Room.objects.create(
            room_name=portfolio.portfolio_name,
            room_id= portfolio.session_id,
            authority_portfolio=portfolio,
            product=product.lower()
        )
        room.save()

    messages = Message.objects.filter(room=room)
    if len(messages) == 0 :
        Message.objects.create(
            room=room,
            message="Hey, How may I help you?",
            author=portfolio,
            read=True,
            side=True,
            message_type="TEXT"
        )
        messages = Message.objects.filter(room=room)
    return portfolio.id, room.id, messages


