from django.db.models import Q
from rest_framework import permissions

from friendship.models import Friendship


class IsCurrentUserOrFriend(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Check if the user making the request is the current user
        if request.user == obj.user:
            return True

        # Check if the user making the request is a friend (with an accepted friendship status)
        if Friendship.objects.filter(Q(from_user=obj.from_user, status=Friendship.StatusEnum.ACCEPTED) | Q(to_user=obj.from_user, status=Friendship.StatusEnum.ACCEPTED)).exists():
            return True

        return False
