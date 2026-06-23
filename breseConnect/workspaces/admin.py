from django.contrib import admin
from . import models

@admin.register(models.Workspace)
class WorkspaceAdmin(admin.ModelAdmin):
   pass

@admin.register(models.workspaceMember)
class WorkspaceMemberAdmin(admin.ModelAdmin):
   pass

@admin.register(models.Room)
class RoomAdmin(admin.ModelAdmin):
   pass

@admin.register(models.Message)
class MessageAdmin(admin.ModelAdmin):
    pass

@admin.register(models.Document)
class DocumentAdmin(admin.ModelAdmin):
   pass


