from django.urls import path
from . import views

urlpatterns = [
    path('csrf/', views.get_csrf_token, name='auth_csrf'),
    path('register/', views.register_user, name='auth_register'),
    path('login/', views.login_user, name='auth_login'),
    path('logout/', views.logout_user, name='auth_logout'),
    path('me/', views.get_current_user, name='auth_me'),
]