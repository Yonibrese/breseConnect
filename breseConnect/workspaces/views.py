from django.shortcuts import render
from rest_framework import viewsets
from .models import Workspace, Room, Message
from .serializers import workspaceSerializer, RoomSerializer, MessageSerializer

class WorkspaceViewSet(viewsets.ModelViewSet):
    queryset = Workspace.objects.all()
    serializer_class = workspaceSerializer
    def get_queryset(self):
        return Workspace.objects.filter(members=self.request.user)

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    filterset_fields = ['workspace']

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    filterset_fields = ['room']

    def preform_create(self, serializer):
        serializer.save(sender=self.request.user)