# Generated by Django 5.0.1 on 2024-05-02 09:33

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('itpub_models', '0033_alter_userwallet_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userwallet',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
    ]
