from channels.auth import AuthMiddlewareStack
from django.contrib.auth.models import AnonymousUser
from rest_framework.exceptions import AuthenticationFailed
from channels.middleware import BaseMiddleware
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.tokens import TokenError
from django.contrib.auth.models import User
import re
from channels.db import database_sync_to_async


@database_sync_to_async
def get_user(token_key):
    if token_key is None or token_key == "":
        return AnonymousUser

    try:
        access_token = AccessToken(token_key)
        user = User.objects.get(pk=access_token["user_id"])
    except (TokenError, User.DoesNotExist):
        return AnonymousUser
    else:
        return user


class TokenAuthMiddleware(BaseMiddleware):
    def __init__(self, inner):
        super().__init__(inner)

    async def __call__(self, scope, receive, send):
        subprotocols = scope.get(
            "subprotocols", []
        )  # Authorization header 부재로 인한 workaround
        if len(subprotocols):
            scope["user"] = await get_user(subprotocols[1])
        else:
            scope["user"] = AnonymousUser()
        return await super().__call__(scope, receive, send)


def TokenAuthMiddlewareStack(inner):
    return TokenAuthMiddleware(AuthMiddlewareStack(inner))
