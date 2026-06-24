# workspaces/consumers.py
import json
import traceback
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            # 1. Extract parameters from the URL route
            self.workspace_slug = self.scope['url_route']['kwargs']['workspace_slug']
            self.room_id = self.scope['url_route']['kwargs']['room_id']
            self.room_group_name = f"chat_room_{self.room_id}"

            print(f"--- Handshaking for room {self.room_id} ---")

            # 2. Join the room group channel layer
            if self.channel_layer:
                await self.channel_layer.group_add(
                    self.room_group_name,
                    self.channel_name
                )

            # 3. Accept the connection
            await self.accept()
            print(f"--- ✅ WebSocket Connected Successfully to room {self.room_id} ---")

        except Exception as e:
            print("\n❌ CRITICAL ERROR IN CONNECT EXECUTOR:")
            print(traceback.format_exc())
            # Close the socket cleanly so it doesn't just hang for 5 seconds
            await self.close(code=1011)

    async def disconnect(self, close_code):
        try:
            if hasattr(self, 'room_group_name') and self.channel_layer:
                await self.channel_layer.group_discard(
                    self.room_group_name,
                    self.channel_name
                )
            print(f"--- WebSocket Disconnected cleanly (Code: {close_code}) ---")
        except Exception as e:
            print("\n❌ CRITICAL ERROR IN DISCONNECT EXECUTOR:")
            print(traceback.format_exc())

    async def receive(self, text_data):
        try:
            text_data_json = json.loads(text_data)
            message = text_data_json.get('message', '')

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                }
            )
        except Exception as e:
            print("\n❌ CRITICAL ERROR IN RECEIVE EXECUTOR:")
            print(traceback.format_exc())

    async def chat_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))