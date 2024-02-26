from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth.models import User
from .validators import validate_unique_username, validate_unique_email


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})

    def check_user(self, data) -> User:
        user = authenticate(username=data.get('username'), password=data.get('password'))
        if not user:
            raise serializers.ValidationError('Invalid credentials.')
        return user


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def validate_username(self, value):
        validate_unique_username(value)
        return value

    def validate_email(self, value):
        validate_unique_email(value)
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

