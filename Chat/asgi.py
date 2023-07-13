"""
ASGI config for Chat project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os
import django
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Chat.settings")
django.setup()

from channels.auth import AuthMiddleware, AuthMiddlewareStack
from notifications.routing import websocket_urlpatterns

application = ProtocolTypeRouter(
    {
        'http' : get_asgi_application(),
        'websocket' : AuthMiddlewareStack(
            URLRouter(
                websocket_urlpatterns
            )
        )

    }
)
