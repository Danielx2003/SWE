from rest_framework import serializers
from .models import QRCode
from django.utils import timezone
from .qrCodeUtil import generate_random_qr_string


class QRCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = QRCode
        fields = ['id', 'code', 'creator', 'creation_date', 'name', 'xp', 'points', 'qr_type', 'expiration_date']
        read_only_fields = ['id', 'code', 'creator', 'creation_date']

    def validate_name(self, value):
        # Check that the name is not empty
        if len(value) == 0:
            raise serializers.ValidationError("Name cannot be empty")
        return value

    def validate_xp(self, value):
        # Check that the xp is not negative
        if value < 0:
            raise serializers.ValidationError("XP cannot be negative")
        return value

    def validate_points(self, value):
        # Check that the points is not negative
        if value < 0:
            raise serializers.ValidationError("Points cannot be negative")
        return value

    def validate_qr_type(self, value):
        # Check that the qr_type is either 1 or 2
        if value not in [1, 2]:
            raise serializers.ValidationError("QR type must be either 1 or 2")
        return value

    def validate_expiration_date(self, value):
        # Check that the expiration date is in the future
        if value < timezone.now():
            raise serializers.ValidationError("Expiration date must be in the future")
        return value

    def create(self, validated_data):
        # Generate remaining fields
        validated_data['creation_date'] = timezone.now()
        validated_data['code'] = generate_random_qr_string()
        validated_data['creator'] = self.context['request'].user  # Set the current user as the creator
        return QRCode.objects.create(**validated_data)
