# Generated by Django 5.0.6 on 2024-06-02 12:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('itpub_models', '0056_rename_adddate_usertransactions_add_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usertransactions',
            name='add_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
