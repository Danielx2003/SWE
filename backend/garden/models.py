from django.contrib.auth.models import User
from django.db import models

from store.models import Item


class GardenData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    points = models.IntegerField(default=0)
    coins = models.IntegerField(default=0)
    plants = models.ManyToManyField('Plant', related_name='gardens')

    def __str__(self):
        return f"Garden Data for {self.user.username}"


class UserInventory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)


class Plant(models.Model):
    class PlantTypeEnum(models.TextChoices):
        BLUEBELL_DEEP = 'BB_Deep'
        BLUEBELL_LILAC = 'BB_Lilac'
        BLUEBELL_PALE = 'BB_Pale'
        MARIGOLD_ORANGE = 'Marigold_Orange'
        MARIGOLD_RED = 'Marigold_Red'
        MARIGOLD_YELLOW = 'Marigold_Yellow'
        TULIP_ORANGE = 'Tulip_Orange'
        TULIP_PINK = 'Tulip_Pink'
        TULIP_RED = 'Tulip_Red'
        TULIP_YELLOW = 'Tulip_Yellow'
        SUNFLOWER = 'Sunflower'

    plant_type = models.CharField(max_length=20, choices=PlantTypeEnum.choices, unique=True)


class GardenLayout(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    plant1 = models.ForeignKey(Plant, related_name='plant1', on_delete=models.CASCADE, default=None, null=True)
    plant2 = models.ForeignKey(Plant, related_name='plant2', on_delete=models.CASCADE, default=None, null=True)
    plant3 = models.ForeignKey(Plant, related_name='plant3', on_delete=models.CASCADE, default=None, null=True)
    decoration1 = models.ForeignKey(Item, related_name='decoration1', on_delete=models.CASCADE, default=None, null=True)
    decoration2 = models.ForeignKey(Item, related_name='decoration2', on_delete=models.CASCADE, default=None, null=True)
