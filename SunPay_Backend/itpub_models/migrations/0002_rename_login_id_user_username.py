# Generated by Django 3.2.18 on 2024-01-26 14:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('itpub_models', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='login_id',
            new_name='username',
        ),
    ]
