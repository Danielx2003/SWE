from django.urls import path

from .views import FriendshipListView, NonFriendUserSearchView, FriendshipAcceptView, FriendshipRejectView, FriendshipUnfriendView

urlpatterns = [
    path('friends/', FriendshipListView.as_view(), name='friendship-list'),
    path('user-search/', NonFriendUserSearchView.as_view(), name='users-search'),
    path('accept/<int:pk>/', FriendshipAcceptView.as_view(), name='friendship-accept'),
    path('reject/<int:pk>/', FriendshipRejectView.as_view(), name='friendship-reject'),
    path('unfriend/<int:pk>/', FriendshipUnfriendView.as_view(), name='friendship-unfriend'),
]
