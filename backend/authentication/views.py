from django.contrib.auth.models import User
from django.db import transaction
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics
from django.contrib.auth import login, logout

from .serializers import RegistrationSerializer, LoginSerializer, UserDetailSerializer
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
    

class LogoutView(APIView):
    """
    View for recieving user details.
    url: /authentication/details/
    method: POST
    request body: N/A
    response body: {
        'username': username,
        'is_superuser': true / false 
    }
    successful response: {
        'message': 'Logout successful'
    } => code: 200
    failure: {
        'error': 'User is not authenticated'
    } => code: 400
    """
    def post(self, request):
        if request.user.is_authenticated:
            logout(request)
            return Response({'message': 'Logout successful'})
        else:
            return Response({'error': 'User is not authenticated'}, status=400)
        

class UserDetailsView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer

class UserDetailsView(generics.RetrieveAPIView):
    """
    View for getting details of the current user.
    url: /authentication/user/
    method: GET
    successful response: {
        "username": "username",
        "email": "email",
        "permissions": ["permission1", "permission2", ...],
        "groups": ["group1", "group2", ...]
    }
    code: 200
    """
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    
    def get_object(self):
        return self.request.user

