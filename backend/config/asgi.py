"""
ASGI config for config project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os

# django 모듈을 부르기 전에 환경 변수가 먼저 세팅돼있어야 한다.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from k8s.urls import websocket_urlpatterns
from k8s.middlewares import TokenAuthMiddlewareStack

asgi_app = get_asgi_application()

application = ProtocolTypeRouter(
    {
        "http": asgi_app,
        "websocket": TokenAuthMiddlewareStack(URLRouter(websocket_urlpatterns)),
    }
)
