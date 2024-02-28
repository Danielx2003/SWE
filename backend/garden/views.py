from rest_framework import generics
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination

from .models import GardenData
from .serializers import GardenDataSerializer, GardenLeaderboardSerializer


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


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class GardenLeaderboardView(generics.ListAPIView):
    """
    API endpoint that allows garden leaderboard to be viewed.
    method: GET
    url: garden/leaderboard/?page=pagenumber&page_size=pagesize
    ordered by points in descending order
    successful response: [
        {
            "username": "username",
            "points": "points"
        },
        ...
    ]
    """
    serializer_class = GardenLeaderboardSerializer
    pagination_class = CustomPagination
    permission_classes = [permissions.IsAuthenticated]
    queryset = GardenData.objects.all().order_by('-points')
