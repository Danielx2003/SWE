from django.urls import path
from .views import GardenDataDetail, GardenLeaderboardView

urlpatterns = [
    path('garden-data/', GardenDataDetail.as_view(), name='garden-data-detail'),
    path('leaderboard/', GardenLeaderboardView.as_view(), name='garden_leaderboard'),
]