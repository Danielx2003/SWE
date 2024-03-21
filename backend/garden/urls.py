from django.urls import path
from .views import GardenDataDetail, GardenLeaderboardView, GardenRankView, WeatherView, UserEquipmentAPIView, \
    GardenDataDetailByUsernameView, GardenLayoutUpdateView

urlpatterns = [
    path('garden-data/', GardenDataDetail.as_view(), name='garden-data-detail'),
    path('leaderboard/', GardenLeaderboardView.as_view(), name='garden_leaderboard'),
    path('weather/<str:lat>/<str:lon>/', WeatherView.as_view(), name='weather'),
    path('garden-rank/<str:username>/', GardenRankView.as_view(), name='garden-rank'),
    path('equipment/', UserEquipmentAPIView.as_view(), name='user_equipment'),
    path('garden-data/<str:username>/', GardenDataDetailByUsernameView.as_view(), name='garden_data_detail_by_username'),
    path('garden-data/update/', GardenLayoutUpdateView.as_view(), name='garden_data_update'),
]