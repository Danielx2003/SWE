from django.db import transaction
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Item
from .serializers import ItemSerializer, PurchaseSerializer
from garden.models import GardenData, UserInventory


class ItemByShopTypeAPIView(generics.ListAPIView):
    """
    API endpoint to get items by shop type
    request: GET
    request params: shop_type
    url: store/get-store/{shop type}/ shop types are: 'consumables', 'decorations'
    response example: [
    {   "id": 1,
        "item_type": "trees",
        "is_available": true,
        "price": 100,
        "shop": "decorations",
        "is_unique": false
    },
    {   "id": 2,
        "item_type": "bird_bath",
        "is_available": true,
        "price": 200,
        "shop": "decorations",
        "is_unique": false
    }
    ...
    ]
    response code: 200
    """
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        shop_type = self.kwargs.get('shop_type')
        return Item.objects.filter(shop=shop_type, is_available=True)


class PurchaseItemAPIView(APIView):
    """
    API endpoint to purchase an item
    request: POST
    url: shop/purchase/
    request body example: {"item_type": "gnome", "quantity": 1}
    response example: {"message": "Purchase successful"}
    response code: 200
    """
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        serializer = PurchaseSerializer(data=request.data)
        if serializer.is_valid():
            item = serializer.validated_data.get('item')
            quantity = serializer.validated_data.get('quantity')

            user = request.user
            garden_data = GardenData.objects.get(user=user)

            # Check if user has enough coins to purchase
            total_cost = item.price * quantity
            if garden_data.coins >= total_cost:
                # Deduct coins and update inventory
                garden_data.coins -= total_cost
                garden_data.save()
                user_inventory, created = UserInventory.objects.get_or_create(user=user, item=item)
                user_inventory.quantity += quantity
                user_inventory.save()
                return Response({"message": "Purchase successful"}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Insufficient coins"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)