from rest_framework import serializers
from .models import Workspace, Room, Message, Document
from accounts.serializers import UserSerializer

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'name', 'workspace', 'created_at']

class workspaceSerializer(serializers.ModelSerializer):
    rooms = RoomSerializer(many=True, read_only=True)

    class Meta:
        model = Workspace
        fields = ['id', 'name', 'slug', 'created_at', 'members', 'rooms', 'documents']

class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'room', 'sender', 'content', 'timestamp']

