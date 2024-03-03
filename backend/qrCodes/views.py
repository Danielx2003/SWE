import io

from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from django.http import HttpResponse, Http404
from django.utils import timezone

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .qrCodeUtil import generate_qr_code_image
from django.conf import settings

from .models import QRCode
from .serializers import QRCodeSerializer, ChallengeSerializer

from .permisions import IsGamemasterOrAdmin
from garden.models import GardenData
from garden.serializers import GardenDataSerializer


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
    permission_classes = [IsGamemasterOrAdmin]

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
    permission_classes = [IsGamemasterOrAdmin]

    def retrieve(self, request, *args, **kwargs):
        qr_code = self.get_object()
        img_byte_arr = io.BytesIO()
        qr_code_image = generate_qr_code_image(settings.FRONTEND_URL + "/qr?code=" + qr_code.code)
        qr_code_image.save(img_byte_arr, format='JPEG')
        return HttpResponse(img_byte_arr.getvalue(), content_type="image/jpeg")


class ChallengeListView(generics.ListAPIView):
    """
    API endpoint that allows challenges to be viewed or created.
    GET: List all challenges that have not expired
    url: /qrCodes/challenges/
    successful response: [
        {
            "name": "name",
            "xp": "xp",
            "points": "points",
            "qr_type": "qr_type"
        },
        ...
    ]
    code: 200
    """
    serializer_class = ChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return QRCode.objects.filter(expiration_date__gt=timezone.now())

class QRCodeScannedView(APIView):
    """
    Api endpoint that allows QR codes to be scanned.
    url: /qrcodes/find/{code}/
    method: PUT
    request body: None
    returns: updated GardenData of the user
    code: 200
    successful response: {
        "garden": {
            "id": "id",
            "user": "user",
            "points": "points",
            "xp": "xp",
            "num_plants": "num_plants"
        },
        qrcode: {
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
    }
    """
    permission_classes = [permissions.IsAuthenticated]
    @transaction.atomic()
    def put(self, request, code):
        try:
            qr_code = QRCode.objects.all().filter(expiration_date__gt=timezone.now()).get(code=code)
            if request.user in qr_code.scanned_by_users.all():
                return Response({"detail": "User already scanned this QR code"}, status=400)
            user_id = request.user.id
            garden = GardenData.objects.get(user__id=user_id)
            garden.points += qr_code.points
            garden.xp += qr_code.xp
            if qr_code.qr_type == 1:
                garden.num_plants += 1
            garden.save()
            qr_code.scanned_by_users.add(request.user)
            return Response({"garden": GardenDataSerializer(garden).data, "qrcode": QRCodeSerializer(qr_code).data}, status=200)
        except ObjectDoesNotExist:
            return Response({"detail": "QR code or user's garden not found"}, status=404)
