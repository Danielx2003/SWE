from rest_framework import serializers
from .models import GardenData


class GardenDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = GardenData
        fields = ['id', 'points', 'xp', 'num_plants']


class GardenLeaderboardSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = GardenData
        fields = ('username', 'points')