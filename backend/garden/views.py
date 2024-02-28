from rest_framework import generics
from rest_framework import permissions
from .models import GardenData
from .serializers import GardenDataSerializer

class GardenDataDetail(generics.RetrieveAPIView):
    """
    API endpoint that allows garden data of authenticated user to be viewed.
    method: GET
    url: garden/garden-data/
    successful response: {
        "id": "id",
        "garden": "garden",
        "plants": "plants",
        "xp": "xp",
        "points": "points"
    }
    """
    queryset = GardenData.objects.all()
    serializer_class = GardenDataSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        user_id = self.request.user.id
        return self.queryset.get(user__id=user_id)
