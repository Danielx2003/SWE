from django.urls import path
from .views import GardenDataDetail, GardenLeaderboardView, WeatherView

urlpatterns = [
    path('garden-data/', GardenDataDetail.as_view(), name='garden-data-detail'),
    path('leaderboard/', GardenLeaderboardView.as_view(), name='garden_leaderboard'),
    path('weather/<str:lat>/<str:lon>/', WeatherView.as_view(), name='weather'),
]