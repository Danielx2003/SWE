from rest_framework import serializers
from .models import QRCode
from django.utils import timezone


class QRCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = QRCode
        fields = ['id', 'code', 'creator', 'creation_date', 'name', 'coins', 'points', 'qr_type', 'expiration_date']
        read_only_fields = ['id', 'code', 'creator', 'creation_date']

    POINTS_CAP = 50
    COINS_CAP = 50

    def validate_name(self, value):
        # Check that the name is not empty
        if len(value) == 0:
            raise serializers.ValidationError("Name cannot be empty")
        return value

    def validate_xp(self, value):
        # Check that the xp is not negative or above XP_CAP
        if value < 0:
            raise serializers.ValidationError("Coins cannot be negative")
        elif value > self.COINS_CAP:
            raise serializers.ValidationError("Coins cannot be above " + self.COINS_CAP)
        return value

    def validate_points(self, value):
        # Check that the points is not negative or above POINTS_CAP
        if value < 0:
            raise serializers.ValidationError("Points cannot be negative")
        elif value > self.POINTS_CAP:
            raise serializers.ValidationError("Coins cannot be above " + self.POINTS_CAP)
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
        validated_data['creator'] = self.context['request'].user  # Set the current user as the creator
        return QRCode.objects.create(**validated_data)


class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = QRCode
        fields = ['name', 'coins', 'points', 'qr_type']