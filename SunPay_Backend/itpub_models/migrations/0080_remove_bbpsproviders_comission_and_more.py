# Generated by Django 5.0.6 on 2024-06-08 08:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('itpub_models', '0079_bbpsproviders_comission_bbpsproviders_compback_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bbpsproviders',
            name='comission',
        ),
        migrations.RemoveField(
            model_name='bbpsproviders',
            name='compback',
        ),
        migrations.RemoveField(
            model_name='bbpsproviders',
            name='diback',
        ),
        migrations.RemoveField(
            model_name='bbpsproviders',
            name='retback',
        ),
        migrations.AddField(
            model_name='bbpstransactions',
            name='comission',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='rechdiback',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='rechretback',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
