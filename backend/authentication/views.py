from django.db import transaction
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import login, logout

from .serializers import RegistrationSerializer, LoginSerializer, UserSerializer
from garden.models import GardenData


class RegistrationView(APIView):
    """
    View for registering a new user.
    url: /authentication/register/
    method: POST
    request body: {
        "email": "email",
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
    permission_classes = [permissions.AllowAny]

    @transaction.atomic()
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            GardenData.objects.create(user=user)
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
    

class UserDetails(APIView):
    """
    View for recieving user details.
    url: /authentication/details/
    method: POST
    request body: N/A
    response body: {
        'username': username,
        'is_superuser': true / false 
    }
    successful response: None
    code: 200
    """
    def get(self, request):
        if request.user.is_authenticated:
            serializer = UserSerializer(request.user)
            return Response(serializer.data)
        else:
            return Response({'message': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        

class LogoutView(APIView):
    def post(request):
        if request.user.is_authenticated:
            logout(request)
            return JsonResponse({'message': 'Logout successful'})
        else:
            return JsonResponse({'error': 'User is not authenticated'}, status=400)