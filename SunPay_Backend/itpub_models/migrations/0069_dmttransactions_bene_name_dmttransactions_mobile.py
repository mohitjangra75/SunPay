# Generated by Django 5.0.6 on 2024-06-03 16:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('itpub_models', '0068_alter_wallettransactions_amount'),
    ]

    operations = [
        migrations.AddField(
            model_name='dmttransactions',
            name='bene_name',
            field=models.CharField(blank=True, max_length=255, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='dmttransactions',
            name='mobile',
            field=models.CharField(blank=True, max_length=255, null=True, unique=True),
        ),
    ]
