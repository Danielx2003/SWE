import requests
from django.contrib.auth.models import User
from django.db import transaction
from django.http import JsonResponse
from django.views import View
from rest_framework import generics
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import GardenData, UserInventory, GardenLayout, Plant
from .permisions import IsCurrentUserOrFriend
from .serializers import GardenDataSerializer, GardenLeaderboardSerializer, GardenRankSerializer, \
    UserInventorySerializer, GardenLayoutSerializer
from store.models import Item


class WeatherView(View):
    def get(self, request, lat, lon):
        api_key = '147e93e240e81ea392ddd8bc7e833012'
        url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}'

        try:
            response = requests.get(url)
            data = response.json()
            return JsonResponse(data)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


class GardenDataDetail(generics.RetrieveAPIView):
    """
    API endpoint that allows garden data of authenticated user to be viewed.
    method: GET
    url: garden/garden-data/
    successful response: {
        "id": "id",
        "garden": "garden",
        "plants": ["plants"...],
        "coins": "coins",
        "points": "points"
        "garden_layout": {
            "plants": ["plants"...],
            "decorations": ["decorations"...]
        }
    }
    """
    queryset = GardenData.objects.all()
    serializer_class = GardenDataSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user_id = self.request.user.id
        return self.queryset.get(user__id=user_id)

    def get(self, request, *args, **kwargs):
        garden_dict = GardenDataSerializer(self.get_object()).data
        garden_layout = GardenLayoutSerializer(GardenLayout.objects.get(user=self.request.user)).data
        return Response({"garden_info": garden_dict, "garden_layout": garden_layout})


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class GardenLeaderboardView(generics.ListAPIView):
    """
    API endpoint that allows garden leaderboard to be viewed.
    method: GET
    url: garden/leaderboard/?page=pagenumber&page_size=pagesize
    ordered by points in descending order
    successful response: [
        {
            "rank": "rank_number",
            "username": "username",
            "points": "points"
        },
        ...
    ]
    """
    serializer_class = GardenLeaderboardSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return GardenData.objects.order_by('-points')


class GardenRankView(APIView):
    """
    API endpoint that returns the points and rank for a given username.
    method: GET
    url: garden/garden-rank/<str:username>/
    successful response: {
        "username": "username",
        "points": "points",
        "rank": "rank"
    }
    """
    permission_classes = [permissions.AllowAny]  # You may restrict this if needed

    def get(self, request, username):
        try:
            garden_data = GardenData.objects.get(user__username=username)
            rank = GardenData.objects.filter(points__gt=garden_data.points).count() + 1
            serializer = GardenRankSerializer({
                'username': username,
                'points': garden_data.points,
                'rank': rank
            })
            return JsonResponse(serializer.data)
        except GardenData.DoesNotExist:
            return JsonResponse({'error': f'User {username} not found'}, status=404)


class UserEquipmentAPIView(generics.ListAPIView):
    """
    Endpoint to get user equipment
    method: GET
    url: garden/equipment/
    successful response: [
        {
            "item": "item",
            "quantity": "quantity"
        },
        ...
    ]
    response code: 200
    """
    serializer_class = UserInventorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return UserInventory.objects.filter(user=user)


class GardenDataDetailByUsernameView(generics.RetrieveAPIView):
    """
    API endpoint that allows garden data of a user to be viewed.
    method: GET
    url: garden/garden-data/<str:username>/
    successful response: {
        "user": "username",
        "points": "points"
        "garden_layout": {
            "plants": ["plants"...],
            "decorations": ["decorations"...]
        }
    }
    """
    serializer_class = GardenLayoutSerializer
    permission_classes = [IsAuthenticated, IsCurrentUserOrFriend]

    def get_object(self):
        # Get the username from the URL parameter
        username = self.kwargs.get('username')
        # Get the user object by username
        if not User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'User not found'}, status=404)
        user = User.objects.get(username=username)
        # Get the garden data for the user
        garden_data = GardenData.objects.get(user=user)
        return garden_data

    def get(self, request, *args, **kwargs):
        garden_layout = GardenLayoutSerializer(GardenLayout.objects.get(user=self.get_object().user)).data
        return Response({"garden_info": GardenDataSerializer(self.get_object()).data, "garden_layout": garden_layout})


class GardenLayoutUpdateView(APIView):
    """
    API endpoint that allows garden layout of authenticated user to be updated.
    method: POST
    url: garden/garden-data/update/
    request body: {
        plant1: "plant1",
        plant2: "plant2",
        plant3: "plant3",
        decoration1: "decoration1",
        decoration2: "decoration2"
    }
    """
    permission_classes = [IsAuthenticated]
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        user = self.request.user
        current_garden_data = GardenLayout.objects.get(user=user)

        current_garden_data.plant1 = Plant.objects.get(plant_type=request.data.get('plant1'))
        current_garden_data.plant2 = Plant.objects.get(plant_type=request.data.get('plant2'))
        current_garden_data.plant3 = Plant.objects.get(plant_type=request.data.get('plant3'))
        current_garden_data.decoration1 = Item.objects.get(item_type=request.data.get('decoration1'))
        current_garden_data.decoration2 = Item.objects.get(item_type=request.data.get('decoration2'))
        current_garden_data.save()

        return Response(GardenLayoutSerializer(current_garden_data).data)

