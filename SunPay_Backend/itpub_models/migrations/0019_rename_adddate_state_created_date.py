# Generated by Django 4.2.11 on 2024-04-06 11:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("itpub_models", "0018_state_update_date"),
    ]

    operations = [
        migrations.RenameField(
            model_name="state",
            old_name="adddate",
            new_name="created_date",
        ),
    ]
