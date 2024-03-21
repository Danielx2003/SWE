from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from .qrCodeUtil import generate_random_qr_string


class QRCode(models.Model):
    QR_TYPES = (
        (1, 'Plant'),
        (2, 'Coins')
    )

    name = models.CharField(max_length=255)
    code = models.CharField(max_length=255, unique=True)
    coins = models.IntegerField()
    points = models.IntegerField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    expiration_date = models.DateTimeField()
    creation_date = models.DateTimeField(auto_now_add=True)
    qr_type = models.IntegerField(choices=QR_TYPES)
    scanned_by_users = models.ManyToManyField(User, related_name='qrcodes', blank=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            code = generate_random_qr_string()
            while QRCode.objects.filter(code=code).exists():
                code = generate_random_qr_string()
            self.code = code
            self.creation_date = timezone.now()
        super(QRCode, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
