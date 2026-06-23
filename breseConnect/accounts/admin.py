from django.contrib import admin
from . import models

@admin.register(models.User)
class AccountAdmin(admin.ModelAdmin):
    pass
