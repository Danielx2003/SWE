from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


def validate_unique_username(value):
    if User.objects.filter(username=value).exists():
        raise ValidationError('Username already exists.')


def validate_unique_email(value):
    if User.objects.filter(email=value).exists():
        raise ValidationError('Email already exists.')
