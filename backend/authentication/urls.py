from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.RegistrationView.as_view(), name="register"),
    path("login/", views.LoginView.as_view(), name="login"),
    path("logout/", views.LogoutView.as_view(), name="logout"),
    path("user/", views.UserDetailsView.as_view(), name="user-detail"),
    path("user-search/", views.UserSearchView.as_view(), name="user-search"),
]
