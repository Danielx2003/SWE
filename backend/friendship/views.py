from django.db.models import Q
from rest_framework import generics, permissions, status
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import User
from rest_framework.response import Response

from .models import Friendship
from .permissions import IsToUser
from .serializers import UsernameIDUserSerializer, FriendshipSerializer


class FriendshipListView(generics.ListCreateAPIView):
    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset().filter(Q(from_user=request.user) | Q(to_user=request.user)))
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(from_user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserSearchPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class UserSearchView(generics.ListAPIView):
    serializer_class = UsernameIDUserSerializer
    pagination_class = UserSearchPagination
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = User.objects.all()
        query = self.request.query_params.get('query', None)
        if query:
            queryset = queryset.filter(username__icontains=query).order_by('username')
        return queryset


class FriendshipAcceptView(generics.UpdateAPIView):
    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer
    permission_classes = [permissions.IsAuthenticated, IsToUser]

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.status = Friendship.StatusEnum.ACCEPTED
        instance.save()
        return Response(self.get_serializer(instance).data)


class FriendshipRejectView(generics.DestroyAPIView):
    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer
    permission_classes = [permissions.IsAuthenticated, IsToUser]