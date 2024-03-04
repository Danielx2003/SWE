from rest_framework import permissions


class IsToUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.to_user == request.user