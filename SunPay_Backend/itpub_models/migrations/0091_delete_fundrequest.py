# Generated by Django 5.0.6 on 2024-06-12 08:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('itpub_models', '0090_rename_add_date_bbpstransactions_created_at_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='fundrequest',
        ),
    ]
