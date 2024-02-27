from rest_framework import generics
from rest_framework import permissions
from .models import GardenData
from .serializers import GardenDataSerializer

class GardenDataDetail(generics.RetrieveAPIView):
    queryset = GardenData.objects.all()
    serializer_class = GardenDataSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        user_id = self.request.user.id
        return self.queryset.get(user__id=user_id)
