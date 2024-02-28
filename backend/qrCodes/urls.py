from django.urls import path
from .views import QRCodeListCreateView, QRCodeImageView, QRCodeScannedView, ChallengeListView

urlpatterns = [
    path('', QRCodeListCreateView.as_view(), name='qrcode-list-create'),
    path('<int:pk>/image/', QRCodeImageView.as_view(), name='qrcode-image'),
    path('find/<str:code>/', QRCodeScannedView.as_view(), name='qrcode-lookup'),
    path('challenges/', ChallengeListView.as_view(), name='challenge-list'),
]