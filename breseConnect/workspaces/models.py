from django.db import models
from django.conf import settings


# Create your models here.
class Workspace(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    members = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='WorkspaceMember', 
        related_name='workspaces')
    
    def __str__(self):
        return self.name
    def __repr__(self):
        return f"Workspace(name={self.name}, slug={self.slug})"

class workspaceMember(models.Model):
    RULES_CHOICES = [
        ('admin', 'Admin'),
        ('member', 'Member'),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=RULES_CHOICES, default='member')
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together= ('user','workspace')

class Room(models.Model):
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE, related_name='rooms')
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    def _repr__(self):
        return f"Room(name={self.name}, workspace={self.workspace.name})"

class Message(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['timestamp']

class Document(models.Model):
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE, related_name='documents')
    title = models.CharField(max_length=255)
    content = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def __repr__(self):
        return self.title
