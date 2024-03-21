from rest_framework import serializers
from .models import GardenData, UserInventory, Plant


class GardenDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = GardenData
        fields = ['id', 'points', 'coins', 'garden_layout', 'plants']


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


class UserInventorySerializer(serializers.ModelSerializer):
    item = serializers.CharField(source='item.item_type')

    class Meta:
        model = UserInventory
        fields = ['item', 'quantity']


class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = '__all__'


class GardenLayoutSerializer(serializers.ModelSerializer):
    plants = PlantSerializer(many=True, read_only=True)
    user = serializers.CharField(source='user.username')

    class Meta:
        model = GardenData
        fields = ['garden_layout', 'points', 'user', 'plants']
