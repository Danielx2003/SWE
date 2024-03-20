from django.db import models


class Item(models.Model):
    class ItemEnum(models.TextChoices):
        GNOME = 'gnome'
        BIRD_BATH = 'bird_bath'
        TREES = 'trees'

    class ShopEnum(models.TextChoices):
        DECORATIONS = 'decorations'
        CONSUMABLES = 'consumables'

    item_type = models.TextField(choices=ItemEnum.choices, unique=True)
    is_available = models.BooleanField(default=True)
    price = models.IntegerField()
    shop = models.TextField(choices=ShopEnum.choices)
    is_unique = models.BooleanField(default=False)
