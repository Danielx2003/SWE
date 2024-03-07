from collections import OrderedDict
from itertools import chain

from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework import generics, permissions, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .models import Friendship
from .permissions import IsToUser
from .serializers import UsernameIDUserSerializer, FriendshipSerializer


class FriendshipListView(generics.ListCreateAPIView):
    """
    List all friendships or create a new friendship.
    methods: GET, POST
    url: friendship/friends/
    status parameter is an enum: 100 for pending, 200 for accepted, 300 for rejected

    GET response: {
        "pending": [
            {
                "id": "id",
                "from_user": {
                    "id": "id",
                    "username": "username"
                }
                "to_user": {
                    "id": "id",
                    "username": "username"
                },
                "status": 100
                "date_created": date_created
            },
            ...
        ],
        "accepted": [
            {
                "id": "id",
                "from_user": {
                    "id": "id",
                    "username": "username"
                }
                "to_user": {
                    "id": "id",
                    "username": "username"
                },
                "status": 200
                "date_created": date_created
            },
            ...
        ],
        "requested": [
            {
                "id": "id",
                "from_user": {
                    "id": "id",
                    "username": "username"
                }
                "to_user": {
                    "id": "id",
                    "username": "username"
                },
                "status": 100
                "date_created": date_created
            },
            ...
        ]
    }
    POST request: {
        "to_user_id": id
    }
    POST response: {
        "id": id,
        "from_user": {
            "id": id,
            "username": username
        }
        "to_user": {
            "id": id,
            "username": username
        },
        "status": status
        "date_created": date_created
    """
    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset().filter(Q(from_user=request.user) | Q(to_user=request.user)))
        serializer = self.get_serializer(queryset, many=True)
        grouped_data = OrderedDict({'pending': [], 'accepted': [], 'requested': []})
        for i in serializer.data:
            if i['status'] == Friendship.StatusEnum.ACCEPTED:
                grouped_data['accepted'].append(i)
            elif i['from_user']['id'] == request.user.id:
                grouped_data['pending'].append(i)
            else:
                grouped_data['requested'].append(i)
        return Response(grouped_data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(from_user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserSearchPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class NonFriendUserSearchView(generics.ListAPIView):
    """
    List all users or search for a user, exclude current user and the users current user is already friends with,
    or has received/sent a friend request to them.
    method: GET
    url: friendship/user-search/?query=query
    query parameter is the string to search for
    successful response: [
        {
            "id": "id",
            "username": "username"
        },
        ...
    ]
    """
    serializer_class = UsernameIDUserSerializer
    pagination_class = UserSearchPagination
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = User.objects.all()
        query = self.request.query_params.get('query', None)
        friend_ids = set(chain.from_iterable(
            Friendship.objects
            .filter(Q(from_user=self.request.user) | Q(to_user=self.request.user))
            .all()
            .values_list('to_user', 'from_user')
        ))
        friend_ids.add(self.request.user.id)
        if query:
            queryset = queryset.filter(Q(username__icontains=query) & ~Q(id__in=friend_ids)).order_by('username')
        else:
            queryset = queryset.filter(~Q(id__in=friend_ids)).order_by('username')
        return queryset


class FriendshipAcceptView(generics.UpdateAPIView):
    """
    Accept a friendship request.
    method: PATCH
    url: friendship/accept/id/
    where id is the id of the friendship to be accepted
    successful response: {
        "id": "id",
        "from_user": {
            "id": "id",
            "username": "username"
        }
        "to_user": {
            "id": "id",
            "username": "username"
        },
        "status": 200
        "date_created": "date_created"
    }
    """
    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer
    permission_classes = [permissions.IsAuthenticated, IsToUser]

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.status = Friendship.StatusEnum.ACCEPTED
        instance.save()
        return Response(self.get_serializer(instance).data)


class FriendshipRejectView(generics.DestroyAPIView):
    """
    Reject a friendship request.
    method: DELETE
    url: friendship/reject/id/
    where id is the id of the friendship to be rejected
    successful response: 204 No Content
    """
    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer
    permission_classes = [permissions.IsAuthenticated, IsToUser]

class FriendshipUnfriendView(generics.DestroyAPIView):
    """
    Unfriend a user.
    method: DELETE
    url: friendship/unfriend/id/
    where id is the id of the friendship to be rejected
    successful response: 204 No Content
    """
    serializer_class = FriendshipSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Friendship.objects.filter(Q(status=Friendship.StatusEnum.ACCEPTED) & Q(Q(from_user=self.request.user) | Q(to_user=self.request.user)))
