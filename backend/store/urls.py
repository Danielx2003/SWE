from django.urls import path
from .views import ItemByShopTypeAPIView, PurchaseItemAPIView

urlpatterns = [
    path('get-store/<str:shop_type>/', ItemByShopTypeAPIView.as_view(), name='items_by_shop_type'),
    path('purchase/', PurchaseItemAPIView.as_view(), name='purchase_item'),
]