from django.conf import settings
from django.db import migrations, transaction


@transaction.atomic
def create_groups(apps, schema_editor):
    Group = apps.get_model('auth', 'Group')
    Group.objects.create(name='player')
    Group.objects.create(name='admin')
    Group.objects.create(name='game_master')


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RunPython(create_groups),
    ]