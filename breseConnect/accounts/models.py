from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    avatar_url = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username
    
    def __repr__(self):
        return f"User(username={self.username}, email={self.email})"