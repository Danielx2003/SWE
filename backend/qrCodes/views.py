import io

from django.http import HttpResponse
from django.utils import timezone
from rest_framework import generics
from rest_framework import permissions
from .qrCodeUtil import generate_qr_code_image
from django.conf import settings

from .models import QRCode
from .serializers import QRCodeSerializer
from .permisions import IsSuperUserOnly 


class QRCodeListCreateView(generics.ListCreateAPIView):
    """
    API endpoint that allows QR codes to be viewed or created.
    GET: List all QR codes that have not expired
    url: /qrCodes/
    successful response: [
        {
            "id": "id",
            "name": "name",
            "xp": "xp",
            "points": "points",
            "qr_type": "qr_type",
            "expiration_date": "expiration_date",
            "creation_date": "creation_date",
            "code": "code",
            "creator": "creator"
        },
        ...
    ]
    code: 200
    POST: Create a new QR code
    url: /qrCodes/
    request body: {
        "name": "name",
        "xp": "xp",
        "points": "points",
        "qr_type": "qr_type",
        "expiration_date": "expiration_date"
    }
    successful response: {
        "id": "id",
        "name": "name",
        "xp": "xp",
        "points": "points",
        "qr_type": "qr_type",
        "expiration_date": "expiration_date",
        "creation_date": "creation_date",
        "code": "code",
        "creator": "creator"
    }
    code: 201
    """
    serializer_class = QRCodeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return QRCode.objects.filter(expiration_date__gt=timezone.now())


class QRCodeImageView(generics.RetrieveAPIView):
    """
    API endpoint that allows QR code images to be viewed.
    url: /qrCodes/{id}/image/
    GET: Retrieve a QR code image
    successful response: QR code image
    code: 200
    """
    queryset = QRCode.objects.all()
    permission_classes = [IsSuperUserOnly]

    def retrieve(self, request, *args, **kwargs):
        qr_code = self.get_object()
        img_byte_arr = io.BytesIO()
        qr_code_image = generate_qr_code_image(settings.FRONTEND_URL + "/qr?code=" + qr_code.code)
        qr_code_image.save(img_byte_arr, format='JPEG')
        return HttpResponse(img_byte_arr.getvalue(), content_type="image/jpeg")
