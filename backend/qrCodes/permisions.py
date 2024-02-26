from rest_framework import permissions

class IsSuperUserOnly(permissions.BasePermission):
    """
    Custom permission to only allow superusers to perform certain actions.
    """

    def has_permission(self, request, view):
        # Allow superusers to perform any action
        return request.user and request.user.is_superuser
