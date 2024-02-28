from django.contrib.auth.models import User
from django.db import models

class GardenData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    points = models.IntegerField(default=0)
    xp = models.IntegerField(default=0)
    num_plants = models.IntegerField(default=0)

    def __str__(self):
        return f"Garden Data for {self.user.username}"
