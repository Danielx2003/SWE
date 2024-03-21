from rest_framework import serializers
from .models import GardenData, UserInventory, Plant, GardenLayout
from store.models import Item

class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = ['plant_type']

class GardenDataSerializer(serializers.ModelSerializer):
    plants = PlantSerializer(many=True, read_only=True)

    class Meta:
        model = GardenData
<<<<<<< HEAD
        fields = ['user', 'points', 'coins', 'plants']
=======
        fields = ['id', 'points', 'coins', 'num_plants']
>>>>>>> origin/main


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


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['item_type']


class GardenLayoutSerializer(serializers.ModelSerializer):
    plant1 = PlantSerializer()
    plant2 = PlantSerializer()
    plant3 = PlantSerializer()
    decoration1 = ItemSerializer()
    decoration2 = ItemSerializer()

    class Meta:
        model = GardenLayout
        fields = ['id', 'user', 'plant1', 'plant2', 'plant3', 'decoration1', 'decoration2']
        read_only_fields = ['id', 'user']


class FriendGardenSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username')

    class Meta:
        model = GardenData
        fields = ['points', 'user']
