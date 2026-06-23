# breseConnect/asgi.py
import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'breseConnect.settings')

# Initialize the standard Django ASGI application FIRST.
django_asgi_app = get_asgi_application()

# Safe to import channels routing components now
from channels.routing import ProtocolTypeRouter, URLRouter
import workspaces.routing 

application = ProtocolTypeRouter({
    # Traditional HTTP traffic
    "http": django_asgi_app,
    
    # WebSocket traffic (Direct routing without session validation)
    "websocket": URLRouter(
        workspaces.routing.websocket_urlpatterns
    ),
})