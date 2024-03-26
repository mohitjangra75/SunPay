from django.db import models


from django.contrib.auth.models import (
    AbstractBaseUser,
    UserManager,
    PermissionsMixin,
    )

class TransactionStatus(object):
	SUCCESS = 1
	FAILURE = 2
	PENDING = 3

class TransactionType(object):
	IMPS = 1
	NEFT = 2

class BillType(object):
    ELECTRICITY = 0
    GAS = 1
    WATER = 2
    LIC = 3
    INSURANCE = 4
    MUNICIPAL_TAXES_AND_SERVICES = 5
    FASTAG = 6
    LOAN_REPAYMENT = 7
    EDUCATION_FEES = 8
    BROADBAND = 9
    CABLE = 10
    TRAFFIC_CHALLAN = 11
    DIGITAL_VOUCHER = 12
    MOBILE = 13
    DTH = 14
    DATACARD = 15
    POSTPAID = 16
    TELEPHONE = 17
    STV = 18


class User(AbstractBaseUser, PermissionsMixin):

    role_id = models.IntegerField(blank=True, null=True)
    title_id = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    mobile = models.CharField(max_length=15, unique=True, blank=True, null=True)
    gender_id = models.IntegerField(blank=True, null=True)
    username = models.CharField(max_length=30, unique=True, blank=True, null=True)
    password = models.CharField(max_length=128, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    city_id = models.IntegerField(blank=True, null=True)
    package_id = models.IntegerField(blank=True, null=True)
    parent_id = models.IntegerField(blank=True, null=True)
    login_pin = models.CharField(max_length=10, blank=True, null=True)
    is_email_verify = models.BooleanField(default=False)
    is_mobile_verify = models.BooleanField(default=False)
    bc_registration_id = models.CharField(max_length=20, blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    msrno = models.IntegerField(blank=True, null=True)
    is_system_on = models.BooleanField(default=False)
    is_kyc_approved = models.BooleanField(default=False)
    login_on_off = models.BooleanField(default=False)
    device_id = models.CharField(max_length=30, blank=True, null=True)
    psa_id_pan = models.CharField(max_length=30, blank=True, null=True)
    request_id = models.CharField(max_length=30, blank=True, null=True)
    pan_status = models.BooleanField(default=False)
    alternative_mobile_number = models.CharField(max_length=15, blank=True, null=True)
    aadhar = models.CharField(max_length=20, blank=True, null=True)
    pan = models.CharField(max_length=20, blank=True, null=True)
    is_show_notification = models.BooleanField(default=True)
    pin_code = models.CharField(max_length=10, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    on_hold = models.BooleanField(default=False)
    shop_name = models.CharField(max_length=255, blank=True, null=True)
    mac_address = models.CharField(max_length=30, blank=True, null=True)
    actived_for_rnfi = models.BooleanField(default=False)
    state_id = models.IntegerField(blank=True, null=True)
    city_name = models.CharField(max_length=255, blank=True, null=True)
    app_token = models.CharField(max_length=255, blank=True, null=True)
    video_kyc = models.BooleanField(default=False)
    active_profile = models.BooleanField(default=False)
    emp_id = models.CharField(max_length=30, blank=True, null=True)
    hold_amt = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    device_register = models.BooleanField(default=False)
    parent_str = models.CharField(max_length=30, blank=True, null=True)
    pattern = models.CharField(max_length=255, blank=True, null=True)
    pic = models.FileField(upload_to='profile_pics/', null=True, blank=True)
    sign = models.FileField(upload_to='profile_pics/', null=True, blank=True)
    shoppic = models.FileField(upload_to='profile_pics/', null=True, blank=True)
    aadhaarfrontpic = models.FileField(upload_to='profile_pics/', null=True, blank=True)
    aadhaarbackpic = models.FileField(upload_to='profile_pics/', null=True, blank=True)
    pancardpic = models.FileField(upload_to='profile_pics/', null=True, blank=True)
    time = models.TimeField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    aeps_id = models.CharField(max_length=30, blank=True, null=True)
    aeps_two_way_registration = models.BooleanField(default=False)
    daily_authentication = models.BooleanField(default=False)
    first_live_login = models.BooleanField(default=False)
    auth_date = models.DateTimeField(blank=True, null=True)
    is_tpin_enabled = models.BooleanField(default=False)
    tpin = models.IntegerField(blank=True, null=True, unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    mpin = models.IntegerField(blank=True, null=True, unique=True)
    start_val = models.IntegerField(default=0,blank=True, null=True,)
    end_val = models.IntegerField(default=2001,blank=True, null=True,)
    available_balance = models.IntegerField(blank=True, null=True,)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    
    
    USERNAME_FIELD = 'username'
    objects = UserManager()

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if self.role_id == 1:
            self.username = 'SRT101'
        elif self.role_id == 2:
            self.username = 'SDT101'
        elif self.role_id == 3:
            self.username = 'Adm1'
        elif self.role_id == 4:
            self.username = 'EMP101'
        super().save(*args, **kwargs)


class BankDetails(models.Model):
    beneficiary_name = models.CharField(max_length=255, blank=True, null=True)
    bank_name = models.CharField(max_length=255, blank=True, null=True)
    account_number = models.CharField(max_length=255, blank=True, null=True)
    ifsc_code = models.CharField(max_length=50, blank=True, null=True)
    mobile_number = models.CharField(max_length=15, unique=True, blank=True, null=True)
    registered_with = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    bene_id = models.IntegerField(blank=True, null=True)
    is_active =  models.BooleanField(default=True)

    def __str__(self):
        return self.beneficiary_name + self.account_number

class DMTTransactions(models.Model):
    STATUS = (
		(TransactionStatus.PENDING, 'PENDING'),
		(TransactionStatus.FAILURE, 'FAILURE'),
		(TransactionStatus.SUCCESS, 'SUCCESS'),
	)
    TYPE = ((TransactionType.IMPS, 'IMPS'),
		(TransactionType.NEFT, 'NEFT'),)

    created_at = models.DateTimeField(auto_now_add=True)
    ref_id = models.CharField(max_length=255, blank=True, null=True)
    user =  models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    bank_acc_number = models.CharField(max_length=255, blank=True, null=True)
    bene_id = models.IntegerField(blank=True, null=True)
    transaction_status = models.SmallIntegerField(choices=STATUS, db_index=True,)
    amount = models.IntegerField()
    order_id =  models.IntegerField(blank=True, null=True)
    charge = models.IntegerField(blank=True, null=True)
    transaction_type = models.SmallIntegerField(choices=TYPE, db_index=True,)

class UserWallet(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    available_balance = models.IntegerField(blank=True, null=True)

class UserTransactions(models.Model):
    STATUS = (
		(TransactionStatus.PENDING, 'PENDING'),
		(TransactionStatus.FAILURE, 'FAILURE'),
		(TransactionStatus.SUCCESS, 'SUCCESS'),
	)

    created_at = models.DateTimeField(auto_now_add=True)
    bank_ref_number = models.CharField(max_length=255, blank=True, null=True)
    user =  models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    bank_acc_number = models.CharField(max_length=255, blank=True, null=True)
    remark = models.CharField(max_length=255, blank=True, null=True)
    payment_date = models.DateField(blank=True,null=True)
    transaction_status = models.SmallIntegerField(choices=STATUS, db_index=True,)
    payment_mode = models.CharField(max_length=255, blank=True, null=True)
    amount = models.FloatField()
    opening_balance = models.FloatField()
    running_balance = models.FloatField()


class BBPSModelFields(models.Model):
    BILL_TYPE = (
        (BillType.ELECTRICITY ,'ELECTRICITY'),
            (BillType.GAS ,'GAS'),
            (BillType.WATER ,'WATER'),
            (BillType.LIC ,'LIC'),
            (BillType.INSURANCE ,'INSURANCE'),
            (BillType.MUNICIPAL_TAXES_AND_SERVICES ,'MUNICIPAL_TAXES_AND_SERVICES'),
            (BillType.FASTAG ,'FASTAG'),
            (BillType.LOAN_REPAYMENT ,'LOAN_REPAYMENT'),
            (BillType.EDUCATION_FEES ,'EDUCATION_FEES'),
            (BillType.BROADBAND ,'BROADBAND'),
            (BillType.CABLE ,'CABLE'),
            (BillType.TRAFFIC_CHALLAN ,'TRAFFIC_CHALLAN'),
            (BillType.DIGITAL_VOUCHER ,'DIGITAL_VOUCHER'),
            (BillType.MOBILE ,'MOBILE'),
            (BillType.DTH ,'DTH'),
            (BillType.DATACARD ,'DATACARD'),
            (BillType.POSTPAID ,'POSTPAID'),
            (BillType.TELEPHONE ,'TELEPHONE',),
            (BillType.STV ,'STV'),
	)
    provider_id = models.IntegerField( blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    bill_type = models.SmallIntegerField(choices=BILL_TYPE, db_index=True,)

class BBPSTransactions(models.Model):
    STATUS = (
		(TransactionStatus.PENDING, 'PENDING'),
		(TransactionStatus.FAILURE, 'FAILURE'),
		(TransactionStatus.SUCCESS, 'SUCCESS'),
	)
    BILL_TYPE = (
        (BillType.ELECTRICITY ,'ELECTRICITY'),
            (BillType.GAS ,'GAS'),
            (BillType.WATER ,'WATER'),
            (BillType.LIC ,'LIC'),
            (BillType.INSURANCE ,'INSURANCE'),
            (BillType.MUNICIPAL_TAXES_AND_SERVICES ,'MUNICIPAL_TAXES_AND_SERVICES'),
            (BillType.FASTAG ,'FASTAG'),
            (BillType.LOAN_REPAYMENT ,'LOAN_REPAYMENT'),
            (BillType.EDUCATION_FEES ,'EDUCATION_FEES'),
            (BillType.BROADBAND ,'BROADBAND'),
            (BillType.CABLE ,'CABLE'),
            (BillType.TRAFFIC_CHALLAN ,'TRAFFIC_CHALLAN'),
            (BillType.DIGITAL_VOUCHER ,'DIGITAL_VOUCHER'),
            (BillType.MOBILE ,'MOBILE'),
            (BillType.DTH ,'DTH'),
            (BillType.DATACARD ,'DATACARD'),
            (BillType.POSTPAID ,'POSTPAID'),
            (BillType.TELEPHONE ,'TELEPHONE',),
            (BillType.STV ,'STV'),
	)
    user =  models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    transaction_status = models.SmallIntegerField(choices=STATUS, db_index=True,)
    remark = models.CharField(max_length=255, blank=True, null=True)
    bill_type = models.SmallIntegerField(choices=BILL_TYPE, db_index=True,)

class package():
    ISACTIVE = models.BooleanField(default=True)
    pack_id = models.IntegerField(blank=True, primary_key=True)
    pack_name = models.CharField(max_length=255, blank=True, primary_key=True)
    start_value = models.IntegerField(blank=True)
    end_value = models.IntegerField(blank=True)
    is_flat = models.BooleanField(blank=True)
    payment_type = models.CharField(default=True )
    is_distributor = models.BooleanField(default=True)
    distributor_back = models.FloatField(blank=True, primary_key=True)
    is_company = models.BooleanField(default=True)
    company_back = models.FloatField(blank=True, )
    distributor_back = models.IntegerField(blank=True, primary_key=True)
    tds = models.FloatField(blank=True, primary_key=True)

class Customer(models.Model):
    ISACTIVE = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    id = models.IntegerField(blank=True, primary_key=True)
    msrno =  models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    mobile_no = models.IntegerField(blank=True, null=True)
    bank_acc_number = models.CharField(max_length=255, blank=True, null=True)
    bank_acc_name = models.CharField(max_length=255, blank=True, null=True)
    bene_id = models.IntegerField(blank=True, null=True)
    bank_name = models.CharField(max_length=255, blank=True, null=True)
    customerifsc = models.CharField(max_length=255, blank=True, null=True)
    upi_id = models.CharField(max_length=255, blank=True, null=True)
