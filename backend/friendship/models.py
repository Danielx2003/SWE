from enum import Enum

from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import User


class Friendship(models.Model):
    class StatusEnum(models.IntegerChoices):
        PENDING = 100, 'pending'
        ACCEPTED = 200, 'accepted'

    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='from_user')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='to_user')
    status = models.IntegerField(
        default=StatusEnum.PENDING,
        choices=StatusEnum.choices
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['from_user', 'to_user']

    def save(self, *args, **kwargs):
        if self.pk is None:  # Only for new instances, not for updates
            # Ensure bidirectional uniqueness
            if Friendship.objects.filter(from_user=self.to_user, to_user=self.from_user).exists():
                raise ValidationError('Friendship already exists in reverse direction.')
        super().save(*args, **kwargs)