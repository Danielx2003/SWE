from django.contrib.auth.models import User
from rest_framework import serializers

from friendship.models import Friendship


class UsernameIDUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class FriendshipSerializer(serializers.ModelSerializer):
    to_user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    from_user = UsernameIDUserSerializer(read_only=True)
    to_user = UsernameIDUserSerializer(read_only=True)

    class Meta:
        model = Friendship
        fields = '__all__'
        read_only_fields = ['from_user', 'to_user', 'status', 'created_at']

    def validate_to_user_id(self, value):
        from_user = self.context['request'].user
        if from_user.id == value:
            raise serializers.ValidationError("You cannot send a friend request to yourself")

        if Friendship.objects.filter(from_user=from_user, to_user=value).exists():
            raise serializers.ValidationError("Friendship request already exists")

        if Friendship.objects.filter(from_user=value, to_user=from_user).exists():
            raise serializers.ValidationError("Friendship request already exists in reverse direction")

        return value

    def create(self, validated_data):
        return Friendship.objects.create(
            from_user=self.context['request'].user,
            to_user=validated_data['to_user_id']
        )
