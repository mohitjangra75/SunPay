# Generated by Django 5.0.1 on 2024-02-06 08:50

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('itpub_models', '0004_bankdetails'),
    ]

    operations = [
        migrations.CreateModel(
            name='BBPSModelFields',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('provider_id', models.IntegerField(blank=True, null=True)),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('bill_type', models.SmallIntegerField(choices=[(0, 'ELECTRICITY'), (1, 'GAS'), (2, 'WATER'), (3, 'LIC'), (4, 'INSURANCE'), (5, 'MUNICIPAL_TAXES_AND_SERVICES'), (6, 'FASTAG'), (7, 'LOAN_REPAYMENT'), (8, 'EDUCATION_FEES'), (9, 'BROADBAND'), (10, 'CABLE'), (11, 'TRAFFIC_CHALLAN'), (12, 'DIGITAL_VOUCHER'), (13, 'MOBILE'), (14, 'DTH'), (15, 'DATACARD'), (16, 'POSTPAID'), (17, 'TELEPHONE'), (18, 'STV')], db_index=True)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='available_balance',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='end_val',
            field=models.IntegerField(blank=True, default=2001, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='mpin',
            field=models.IntegerField(blank=True, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='user',
            name='start_val',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='tpin',
            field=models.IntegerField(blank=True, null=True, unique=True),
        ),
        migrations.CreateModel(
            name='BBPSTransactions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('transaction_status', models.SmallIntegerField(choices=[(3, 'PENDING'), (2, 'FAILURE'), (1, 'SUCCESS')], db_index=True)),
                ('remark', models.CharField(blank=True, max_length=255, null=True)),
                ('bill_type', models.SmallIntegerField(choices=[(0, 'ELECTRICITY'), (1, 'GAS'), (2, 'WATER'), (3, 'LIC'), (4, 'INSURANCE'), (5, 'MUNICIPAL_TAXES_AND_SERVICES'), (6, 'FASTAG'), (7, 'LOAN_REPAYMENT'), (8, 'EDUCATION_FEES'), (9, 'BROADBAND'), (10, 'CABLE'), (11, 'TRAFFIC_CHALLAN'), (12, 'DIGITAL_VOUCHER'), (13, 'MOBILE'), (14, 'DTH'), (15, 'DATACARD'), (16, 'POSTPAID'), (17, 'TELEPHONE'), (18, 'STV')], db_index=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='DMTTransactions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('ref_id', models.CharField(blank=True, max_length=255, null=True)),
                ('bank_acc_number', models.CharField(blank=True, max_length=255, null=True)),
                ('bene_id', models.IntegerField(blank=True, null=True)),
                ('transaction_status', models.SmallIntegerField(choices=[(3, 'PENDING'), (2, 'FAILURE'), (1, 'SUCCESS')], db_index=True)),
                ('amount', models.IntegerField()),
                ('order_id', models.IntegerField(blank=True, null=True)),
                ('charge', models.IntegerField(blank=True, null=True)),
                ('transaction_type', models.SmallIntegerField(choices=[(1, 'IMPS'), (2, 'NEFT')], db_index=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserTransactions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('bank_ref_number', models.CharField(blank=True, max_length=255, null=True)),
                ('bank_acc_number', models.CharField(blank=True, max_length=255, null=True)),
                ('remark', models.CharField(blank=True, max_length=255, null=True)),
                ('payment_date', models.DateField(blank=True, null=True)),
                ('transaction_status', models.SmallIntegerField(choices=[(3, 'PENDING'), (2, 'FAILURE'), (1, 'SUCCESS')], db_index=True)),
                ('payment_mode', models.CharField(blank=True, max_length=255, null=True)),
                ('amount', models.FloatField()),
                ('opening_balance', models.FloatField()),
                ('running_balance', models.FloatField()),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserWallet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('available_balance', models.IntegerField(blank=True, null=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
