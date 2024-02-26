from django.urls import path
from .views import QRCodeListCreateView, QRCodeImageView

urlpatterns = [
    path('', QRCodeListCreateView.as_view(), name='qrcode-list-create'),
    path('<int:pk>/image/', QRCodeImageView.as_view(), name='qrcode-image'),
    # Add more URLs as needed
]