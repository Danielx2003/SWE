import requests
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views import View
from rest_framework import generics
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .models import GardenData, UserInventory
from .permisions import IsCurrentUserOrFriend
from .serializers import GardenDataSerializer, GardenLeaderboardSerializer, GardenRankSerializer, \
    UserInventorySerializer, GardenLayoutSerializer


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
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        user_id = self.request.user.id
        return self.queryset.get(user__id=user_id)


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
    permission_classes = [permissions.IsAuthenticated]

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
    permission_classes = [permissions.IsAuthenticated, IsCurrentUserOrFriend]

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


class GardenLayoutUpdateView(generics.UpdateAPIView):
    """
    API endpoint that allows garden layout of authenticated user to be updated.
    method: PUT
    url: garden/garden-data/update/
    request body: {
        "garden_layout": {
            "plants": ["plants"...],
            "decorations": ["decorations"...]
        }
    }
    """
    queryset = GardenData.objects.all()
    serializer_class = GardenLayoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        garden_data = serializer.instance
        user = self.request.user
        new_garden_layout = self.request.data.get('garden_layout', None)

        if new_garden_layout:
            if new_garden_layout.get('plants', None) is None:
                return JsonResponse({'error': 'plants key is required'}, status=400)
            if new_garden_layout.get('decorations', None) is None:
                return JsonResponse({'error': 'decorations key is required'}, status=400)

            if not set(new_garden_layout['plants']).issubset([plant.plant_type for plant in garden_data.plants]):
                return JsonResponse({'error': 'not all plants are owned by user/exist'}, status=400)
            if not set(new_garden_layout['decorations']).issubset([inventory_entry.item.item_type for inventory_entry in UserInventory.objects.filter(user=user)]):
                return JsonResponse({'error': 'not all plants are owned by user/exist'}, status=400)
            if not len(set(new_garden_layout['plants'])) == len(new_garden_layout['plants']):
                return JsonResponse({'error': 'plants contains duplicates'}, status=400)
            if not len(set(new_garden_layout['decorations'])) == len(new_garden_layout['decorations']):
                return JsonResponse({'error': 'decorations contains duplicates'}, status=400)
            if not len(set(new_garden_layout['plants'])) <= 3:
                return JsonResponse({'error': 'max 3 plants allowed'}, status=400)

            garden_data.garden_layout = {"plants": list(set(new_garden_layout['plants'])), "decorations": list(set(new_garden_layout['decorations']))}
            garden_data.save()
