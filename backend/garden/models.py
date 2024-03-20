from django.contrib.auth.models import User
from django.db import models

from store.models import Item


class GardenData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    points = models.IntegerField(default=0)
    coins = models.IntegerField(default=0)
    num_plants = models.IntegerField(default=0)

    def __str__(self):
        return f"Garden Data for {self.user.username}"


class UserInventory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)
