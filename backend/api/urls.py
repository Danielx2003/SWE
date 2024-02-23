from django.urls import path
from . import views

urlpatterns = [
    path('hello-world/', views.hello_world, name='hello_world'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
]