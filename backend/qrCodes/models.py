from django.db import models
from django.contrib.auth.models import User

class QRCode(models.Model):
    QR_TYPES = (
        (1, 'Plant'),
        (2, 'XP')
    )

    name = models.CharField(max_length=255)
    code = models.CharField(max_length=255)
    xp = models.IntegerField()
    points = models.IntegerField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    expiration_date = models.DateTimeField()
    creation_date = models.DateTimeField(auto_now_add=True)
    qr_type = models.IntegerField(choices=QR_TYPES)

    def __str__(self):
        return self.name
