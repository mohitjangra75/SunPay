# Generated by Django 5.0.1 on 2024-04-03 07:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('itpub_models', '0012_user_otp'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='asm_name',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='is_asm',
            field=models.BooleanField(default=True),
        ),
    ]
