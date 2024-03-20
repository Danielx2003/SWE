from django.db import migrations


def add_items(apps, schema_editor):
    Item = apps.get_model('store', 'Item')
    Item.objects.create(item_type='gnome', is_available=True, price=10, shop='consumables', is_unique=False)
    Item.objects.create(item_type='bird_bath', is_available=True, price=20, shop='decorations', is_unique=True)
    Item.objects.create(item_type='trees', is_available=True, price=30, shop='decorations', is_unique=True)


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(add_items),
    ]