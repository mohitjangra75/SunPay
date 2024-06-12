# Generated by Django 5.0.6 on 2024-06-02 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('itpub_models', '0058_rename_usertransactions_fundrequests'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='wallettransactions',
            name='bank_acc_number',
        ),
        migrations.RemoveField(
            model_name='wallettransactions',
            name='bene_id',
        ),
        migrations.AlterField(
            model_name='fundrequests',
            name='bank_ref_number',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
