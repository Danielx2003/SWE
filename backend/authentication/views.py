from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import login

from .serializers import RegistrationSerializer, LoginSerializer


class RegistrationView(APIView):
    """
    View for registering a new user.
    url: /authentication/register/
    method: POST
    request body: {
        "username": "username",
        "password": "password",
        "email": "email"
    }
    successful response: {
        email: "email",
        username: "username"
    }
    code: 201
    """
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """
    View for logging in a user.
    url: /authentication/login/
    method: POST
    request body: {
        "username": "username",
        "password": "password"
    }
    successful response: None
    code: 200
    """
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(request.data)
            login(request, user)
            return Response(None, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



