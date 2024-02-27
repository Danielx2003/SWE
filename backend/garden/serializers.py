from rest_framework import serializers
from .models import GardenData

class GardenDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = GardenData
        fields = ['id', 'points', 'xp', 'num_plants']