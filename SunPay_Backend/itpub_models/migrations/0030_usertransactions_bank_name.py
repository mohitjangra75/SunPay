# Generated by Django 5.0.1 on 2024-04-19 05:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('itpub_models', '0029_rename_user_id_fundrequest_user_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='usertransactions',
            name='bank_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
