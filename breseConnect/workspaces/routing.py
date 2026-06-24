# workspaces/routing.py
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    # Pattern: ws://localhost:8000/ws/workspace/<workspace_slug>/room/<room_id>/
    re_path(r'^ws/workspace/(?P<workspace_slug>[\w-]+)/room/(?P<room_id>\d+)/$', consumers.ChatConsumer.as_asgi()),
]