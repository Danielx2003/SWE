from django.urls import path

from .views import FriendshipListView, UserSearchView, FriendshipAcceptView, FriendshipRejectView

urlpatterns = [
    path('friends/', FriendshipListView.as_view(), name='friendship-list'),
    path('user-search/', UserSearchView.as_view(), name='users-search'),
    path('accept/<int:pk>/', FriendshipAcceptView.as_view(), name='friendship-accept'),
    path('reject/<int:pk>/', FriendshipRejectView.as_view(), name='friendship-reject'),
]
