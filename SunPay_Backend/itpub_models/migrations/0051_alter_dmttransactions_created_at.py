# Generated by Django 5.0.6 on 2024-06-01 05:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('itpub_models', '0050_alter_dmttransactions_bene_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dmttransactions',
            name='created_at',
            field=models.DateTimeField(),
        ),
    ]
