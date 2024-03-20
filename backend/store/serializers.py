from rest_framework import serializers
from .models import Item


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class PurchaseSerializer(serializers.Serializer):
    item_type = serializers.ChoiceField(choices=Item.ItemEnum.choices)
    quantity = serializers.IntegerField()

    def validate(self, data):
        item_type = data.get('item_type')
        quantity = data.get('quantity')

        if item_type is None:
            raise serializers.ValidationError("Item type is required")

        try:
            item = Item.objects.get(item_type=item_type)
        except Item.DoesNotExist:
            raise serializers.ValidationError("Item does not exist")

        if not quantity:
            data['quantity'] = 1

        data['item'] = item
        return data
