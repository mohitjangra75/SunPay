# Generated by Django 3.2.18 on 2024-01-26 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('role_id', models.IntegerField(blank=True, null=True)),
                ('title_id', models.IntegerField(blank=True, null=True)),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True, unique=True)),
                ('mobile', models.CharField(blank=True, max_length=15, null=True, unique=True)),
                ('gender_id', models.IntegerField(blank=True, null=True)),
                ('login_id', models.CharField(blank=True, max_length=30, null=True, unique=True)),
                ('password', models.CharField(blank=True, max_length=128, null=True)),
                ('address', models.TextField(blank=True, null=True)),
                ('city_id', models.IntegerField(blank=True, null=True)),
                ('package_id', models.IntegerField(blank=True, null=True)),
                ('parent_id', models.IntegerField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('login_pin', models.CharField(blank=True, max_length=10, null=True)),
                ('is_email_verify', models.BooleanField(default=False)),
                ('is_mobile_verify', models.BooleanField(default=False)),
                ('bc_registration_id', models.CharField(blank=True, max_length=20, null=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('msrno', models.IntegerField(blank=True, null=True)),
                ('is_system_on', models.BooleanField(default=False)),
                ('is_kyc_approved', models.BooleanField(default=False)),
                ('login_on_off', models.BooleanField(default=False)),
                ('device_id', models.CharField(blank=True, max_length=30, null=True)),
                ('psa_id_pan', models.CharField(blank=True, max_length=30, null=True)),
                ('request_id', models.CharField(blank=True, max_length=30, null=True)),
                ('pan_status', models.BooleanField(default=False)),
                ('alternative_mobile_number', models.CharField(blank=True, max_length=15, null=True)),
                ('aadhar', models.CharField(blank=True, max_length=20, null=True)),
                ('pan', models.CharField(blank=True, max_length=20, null=True)),
                ('is_show_notification', models.BooleanField(default=True)),
                ('pin_code', models.CharField(blank=True, max_length=10, null=True)),
                ('dob', models.DateField(blank=True, null=True)),
                ('on_hold', models.BooleanField(default=False)),
                ('shop_name', models.CharField(blank=True, max_length=255, null=True)),
                ('mac_address', models.CharField(blank=True, max_length=30, null=True)),
                ('actived_for_rnfi', models.BooleanField(default=False)),
                ('state_id', models.IntegerField(blank=True, null=True)),
                ('city_name', models.CharField(blank=True, max_length=255, null=True)),
                ('app_token', models.CharField(blank=True, max_length=255, null=True)),
                ('video_kyc', models.BooleanField(default=False)),
                ('active_profile', models.BooleanField(default=False)),
                ('emp_id', models.CharField(blank=True, max_length=30, null=True)),
                ('hold_amt', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('device_register', models.BooleanField(default=False)),
                ('parent_str', models.CharField(blank=True, max_length=30, null=True)),
                ('pattern', models.CharField(blank=True, max_length=255, null=True)),
                ('pic', models.FileField(blank=True, null=True, upload_to='profile_pics/')),
                ('time', models.TimeField(blank=True, null=True)),
                ('latitude', models.FloatField(blank=True, null=True)),
                ('longitude', models.FloatField(blank=True, null=True)),
                ('aeps_id', models.CharField(blank=True, max_length=30, null=True)),
                ('aeps_two_way_registration', models.BooleanField(default=False)),
                ('daily_authentication', models.BooleanField(default=False)),
                ('first_live_login', models.BooleanField(default=False)),
                ('auth_date', models.DateTimeField(blank=True, null=True)),
                ('is_tpin_enabled', models.BooleanField(default=False)),
                ('tpin', models.IntegerField(blank=True, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
