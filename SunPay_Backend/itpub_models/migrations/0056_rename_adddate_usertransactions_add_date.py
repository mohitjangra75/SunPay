# Generated by Django 5.0.6 on 2024-06-02 12:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('itpub_models', '0055_alter_usertransactions_approvedate_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usertransactions',
            old_name='adddate',
            new_name='add_date',
        ),
    ]
