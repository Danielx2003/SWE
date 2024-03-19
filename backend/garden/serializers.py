from rest_framework import serializers
from .models import GardenData


class GardenDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = GardenData
        fields = ['id', 'points', 'xp', 'num_plants']


class GardenLeaderboardSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    rank = serializers.SerializerMethodField()

    class Meta:
        model = GardenData
        fields = ('rank','username', 'points')

    def get_rank(self, obj):
        queryset = GardenData.objects.order_by('-points')
        rank = list(queryset.values_list('id', flat=True)).index(obj.id) + 1
        return rank
    

class GardenRankSerializer(serializers.Serializer):
    username = serializers.CharField()
    points = serializers.IntegerField()
    rank = serializers.IntegerField()