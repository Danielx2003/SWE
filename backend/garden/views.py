import requests
from django.http import JsonResponse
from django.views import View
from rest_framework import generics
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .models import GardenData, UserInventory
from .serializers import GardenDataSerializer, GardenLeaderboardSerializer, GardenRankSerializer, \
    UserInventorySerializer


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
        "plants": "plants",
        "coins": "coins",
        "points": "points"
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