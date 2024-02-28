from django.urls import path
from .views import GardenDataDetail

urlpatterns = [
    path('garden-data/', GardenDataDetail.as_view(), name='garden-data-detail'),
]