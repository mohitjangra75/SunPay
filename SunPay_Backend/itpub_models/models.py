from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save

from django.contrib.auth.models import (
    AbstractBaseUser,
    UserManager,
    PermissionsMixin,
    )

class TransactionStatus(object):
    SUCCESS = 1
    FAILURE = 2
    PENDING = 3
    REINITIATE = 4


class TransactionType(object):   
    IMPS = 1
    NEFT = 2
    WALLET = 3

class CompTransactionType(object):   
    DMT = 1
    WALLET = 2
    BBPS = 3
    UPI = 4

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

class CompanyDetails(models.Model):
    comp_id = models.IntegerField(blank=True, null=True)
    owner_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    alt_email = models.CharField(max_length=255, blank=True, null=True)
    mobile = models.CharField(max_length=255, blank=True, null=True)
    logo = models.FileField(upload_to='profile_pics/', null=True, blank=True)
    alt_mobile = models.CharField(max_length=255, blank=True, null=True)
    website = models.CharField(max_length=255, blank=True, null=True)
    address = models.CharField(max_length=500, blank=True, null=True)
    copyright = models.CharField(max_length=255, blank=True, null=True)
    facebook = models.CharField(max_length=255, blank=True, null=True)
    instagram = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)

class CompanyBank(models.Model):
    bank_id = models.IntegerField(blank=True, null=True)
    bank_logo = models.FileField(upload_to='profile_pics/', null=True, blank=True)
    bank_name = models.CharField(max_length=255, blank=True, null=True)
    ifsc = models.CharField(max_length=255, blank=True, null=True)
    branchname = models.CharField(max_length=255, blank=True, null=True)
    account_holdername = models.CharField(max_length=255, blank=True, null=True)
    account_no = models.CharField(max_length=255, blank=True, null=True)
    cash_deposit_charge = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.bank_name

class Bank(models.Model):
    bank_name = models.CharField(max_length=255, blank=True, null=True)
    bank_code = models.CharField(max_length=255, blank=True, null=True)
    ifsc = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.bank_name
    
class PaysprintBanks(models.Model):
    bank_name = models.CharField(max_length=255, blank=True, null=True)
    bank_code = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.bank_name
    
class PaymentMode(object):
    IMPS = 1
    NEFT = 2
    RTGS = 3
    CASH = 4
    UPI = 5
    CHEQUE= 6
    DD = 7
    IMPS_RTGS_NEFT = 8
    CHEQUE_DD = 9


class FundRequest(models.Model):
    # user jiske through ye request lgi h
    user = models.CharField(max_length=255, blank=True, null=True)
    amount = models.FloatField(blank=True, null=True)
    bank_reference = models.CharField(max_length=255, blank=True, null=True, unique=True)
    payment_mode=  ((PaymentMode.IMPS, 'IMPS'),
		(PaymentMode.NEFT, 'NEFT'),
        (PaymentMode.RTGS, 'RTGS'),
        (PaymentMode.CASH, 'CASH'),
        (PaymentMode.UPI, 'UPI'),
        (PaymentMode.CHEQUE, 'CHEQUE'),
        (PaymentMode.DD, 'DD'))
    remark = models.CharField(max_length=255, blank=True, null=True)
    cashslip = models.FileField(upload_to='profile_pics/', null=True, blank=True)
    # approve only admin krega emp id
    isapproved = models.BooleanField(default=False)
    isupdate = models.BooleanField(default=False)
    isdelete = models.BooleanField(default=False)
    reason = models.CharField(max_length=500, blank=True, null=True)
    status = (
		(TransactionStatus.PENDING, 'PENDING'),
		(TransactionStatus.FAILURE, 'FAILURE'),
		(TransactionStatus.SUCCESS, 'SUCCESS'),
	)
    companybank = models.CharField(max_length=255, blank=True, null=True)
    adddate = models.TimeField(blank=True, null=True)
    approvedate = models.TimeField(blank=True, null=True)
    lastupdate = models.TimeField(blank=True, null=True)

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
    package_id = models.IntegerField(blank=True, null=True)
    parent_id = models.IntegerField(blank=True, null=True)
    # is_email_verify = models.BooleanField(default=False)
    is_mobile_verify = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    msrno = models.IntegerField(blank=True, null=True)
    is_system_on = models.BooleanField(default=False)
    is_kyc_approved = models.BooleanField(default=False)
    login_on_off = models.BooleanField(default=False)
    device_id = models.CharField(max_length=30, blank=True, null=True)
    pan_status = models.BooleanField(default=False)
    alternative_mobile_number = models.CharField(max_length=15, blank=True, null=True)
    aadhar = models.CharField(max_length=20, blank=True, null=True)
    pan = models.CharField(max_length=20, blank=True, null=True)
    # is_show_notification = models.BooleanField(default=True)
    pin_code = models.CharField(max_length=10, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    # on_hold = models.BooleanField(default=False)
    shop_name = models.CharField(max_length=255, blank=True, null=True)
    # mac_address = models.CharField(max_length=30, blank=True, null=True)
    # actived_for_rnfi = models.BooleanField(default=False)
    state_id = models.IntegerField(blank=True, null=True)
    city_name = models.CharField(max_length=255, blank=True, null=True)
    # app_token = models.CharField(max_length=255, blank=True, null=True)
    # video_kyc = models.BooleanField(default=False)
    active_profile = models.BooleanField(default=False)
    emp_id = models.CharField(max_length=30, blank=True, null=True)
    # hold_amt = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    # device_register = models.BooleanField(default=False)
    # parent_str = models.CharField(max_length=30, blank=True, null=True)
    # pattern = models.CharField(max_length=255, blank=True, null=True)
    pic = models.FileField(upload_to='profile_pics/', null=True, blank=True)
    sign = models.FileField(upload_to='profile_pics/', null=True, blank=True)
    shoppic = models.FileField(upload_to='profile_pics/', null=True, blank=True)
    aadhaarfrontpic = models.FileField(upload_to='profile_pics/', null=True, blank=True)
    aadhaarbackpic = models.FileField(upload_to='profile_pics/', null=True, blank=True)
    pancardpic = models.FileField(upload_to='profile_pics/', null=True, blank=True)
    # time = models.TimeField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    aeps_id = models.CharField(max_length=30, blank=True, null=True)
    aeps_two_way_registration = models.BooleanField(default=False)
    # daily_authentication = models.BooleanField(default=False)
    # first_live_login = models.BooleanField(default=False)
    auth_date = models.DateTimeField(blank=True, null=True)
    is_tpin_enabled = models.BooleanField(default=False)
    tpin = models.IntegerField(blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    # is_active = models.BooleanField(default=False)
    # mpin = models.IntegerField(blank=True, null=True, unique=True)
    # start_val = models.IntegerField(default=0,blank=True, null=True,)
    # end_val = models.IntegerField(default=2001,blank=True, null=True,)
    available_balance = models.FloatField(blank=True, null=True,)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    distributor_name = models.CharField(max_length=30, blank=True, null=True)
    is_distributor = models.BooleanField(default=False)
    is_asm = models.BooleanField(default=True)
    asm_name = models.CharField(max_length=30, blank=True, null=True)
    city = models.CharField(max_length=30, blank=True, null=True)
    shop_adress = models.CharField(max_length=255, blank=True, null=True)
    otp = models.CharField(max_length=4,null=True, blank=True)
    # surcharge = models.FloatField(null=True, blank=True)
    diback = models.FloatField(null=True, blank=True)
    retback = models.FloatField(null=True, blank=True)
    compback = models.FloatField(null=True, blank=True)
    rechretback = models.FloatField(null=True, blank=True)
    rechdiback = models.FloatField(null=True, blank=True)

    
    USERNAME_FIELD = 'username'
    objects = UserManager()

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if not self.pk:
            if self.role_id == 1:
                existing_count = User.objects.filter(role_id=1).count()
                username_suffix = existing_count + 101
                self.username = 'SRT{}'.format(username_suffix)
            elif self.role_id == 2:
                existing_count = User.objects.filter(role_id=2).count()
                username_suffix = existing_count + 101
                self.username = 'SDT{}'.format(username_suffix)
            elif self.role_id == 3:
                existing_count = User.objects.filter(role_id=3).count()
                username_suffix = existing_count + 1
                self.username = 'ADM{}'.format(username_suffix)
            elif self.role_id == 4:
                existing_count = User.objects.filter(role_id=4).count()
                username_suffix = existing_count + 101
                self.username = 'EMP{}'.format(username_suffix)
        super().save(*args, **kwargs)

    def pic_url(self):
        if self.pic:
            return self.pic.url
        else:
            return "Image Not Uploaded"
    
    def sign_url(self):
        if self.sign:
            return self.sign.url
        else:
            return "Image Not Uploaded"
    
    def shoppic_url(self):
        if self.shoppic:
            return self.shoppic.url
        else:
            return "Image Not Uploaded"
    
    def aadhaarfrontpic_url(self):
        if self.aadhaarfrontpic:
            return self.aadhaarfrontpic.url
        else:
            return "Image Not Uploaded"
    
    def aadhaarbackpic_url(self):
        if self.aadhaarbackpic:
            return self.aadhaarbackpic.url
        else:
            return "Image Not Uploaded"
    
    def pancardpic_url(self):
        if self.pancardpic:
            return self.pancardpic.url
        else:
            return "Image Not Uploaded"

class UserWallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    available_balance = models.FloatField(blank=True, null=True)

    def __str__(self):
        return self.user.username
    
# @receiver(post_save, sender=User)
# def create_or_update_user_wallet(sender, instance, created, **kwargs):
#     if created:
#         try:
#             user_wallet = UserWallet.objects.get(user=instance)
#             user_wallet.available_balance = instance.available_balance or 0
#             user_wallet.save()
#         except UserWallet.DoesNotExist:
#             UserWallet.objects.create(user=instance, available_balance=instance.available_balance or 0)


@receiver(pre_save, sender=UserWallet)
def update_user_balance(sender, instance, **kwargs):
    try:
        old_instance = UserWallet.objects.get(pk=instance.pk)
        if old_instance.available_balance != instance.available_balance:
            user = instance.user
            if user.available_balance != instance.available_balance:
                user.available_balance = instance.available_balance
                user.save()
    except UserWallet.DoesNotExist:
        pass

class Customer(models.Model):
    customer_firstname = models.CharField(max_length=255, blank=True, null=True)
    customer_lastname = models.CharField(max_length=255, blank=True, null=True)
    customer_mobile = models.CharField(max_length=10, unique=True, blank=True, null=True)
    registered_with = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active =  models.BooleanField(default=True)

    def __str__(self):
        return self.customer_mobile + "-" + self.registered_with.username
    


class BankDetails(models.Model):
    upi_id = models.CharField(max_length=255, blank=True, null=True)
    beneficiary_name = models.CharField(max_length=255, blank=True, null=True)
    bank_name = models.CharField(max_length=255, blank=True, null=True)
    account_number = models.CharField(max_length=255, blank=True, null=True)
    ifsc_code = models.CharField(max_length=50, blank=True, null=True)
    mobile_number = models.CharField(max_length=10,blank=True, null=True)
    registered_with = models.ForeignKey(Customer, on_delete=models.CASCADE, blank=True, null=True)
    bene_id = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active =  models.BooleanField(default=True)

    def __str__(self):
        return self.beneficiary_name
    
class ZpayBankDetail(models.Model):
    VPA = 'vpa'
    ACCOUNT_NUMBER = 'account_number'
    TYPE_CHOICES = [
        (VPA, 'VPA'),
        (ACCOUNT_NUMBER, 'Account Number'),
    ]
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default=ACCOUNT_NUMBER)
    bene_id = models.CharField(max_length=255, blank=True, null=True)
    beneficiary_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    mobile_number = models.CharField(max_length=10,blank=True, null=True)
    account_number = models.CharField(max_length=255, blank=True, null=True)
    ifsc_code = models.CharField(max_length=50, blank=True, null=True)
    bank_name = models.CharField(max_length=255, blank=True, null=True)
    upi = models.CharField(max_length=255, blank=True, null=True)
    registered_with = models.ForeignKey(Customer, on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active =  models.BooleanField(default=True)

    def __str__(self):
        return self.beneficiary_name
    

class DMTTransactions(models.Model):
    STATUS = (
		(TransactionStatus.PENDING, 'PENDING'),
		(TransactionStatus.FAILURE, 'FAILURE'),
		(TransactionStatus.SUCCESS, 'SUCCESS'),
	)
    TYPE = ((TransactionType.IMPS, 'IMPS'),
		(TransactionType.NEFT, 'NEFT'),)

    created_at = models.DateTimeField(auto_now_add=True)
    ref_id = models.CharField(max_length=255, unique=True, blank=True, null=True)
    mobile = models.CharField(max_length=255, blank=True, null=True)
    bene_name = models.CharField(max_length=255, blank=True, null=True)
    user =  models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    bank_acc_number = models.CharField(max_length=255, blank=True, null=True)
    bene_id = models.CharField(max_length=255, blank=True, null=True)
    transaction_status = models.SmallIntegerField(choices=STATUS, db_index=True,)
    amount = models.FloatField(blank=True, null=True)
    order_id =  models.CharField(blank=True, null=True, max_length=255)
    charge = models.FloatField(blank=True, null=True)
    tds = models.FloatField(blank=True, null=True)
    comission = models.FloatField(blank=True, null=True)
    transaction_type = models.SmallIntegerField(choices=TYPE, db_index=True,)
    payment_remark = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(blank=False, null=False)  # new field

    def __str__(self):
        return f"{self.ref_id} - {self.user.username}"


class FundRequests(models.Model):   
    STATUS = (
        (TransactionStatus.PENDING, 'PENDING'),
        (TransactionStatus.FAILURE, 'FAILURE'),
        (TransactionStatus.SUCCESS, 'SUCCESS'),
        (TransactionStatus.REINITIATE, 'REINITIATE')
    )

    payment_choices = (
        (PaymentMode.IMPS_RTGS_NEFT, 'IMPS_RTGS_NEFT'),
        (PaymentMode.CASH, 'CASH'),
        (PaymentMode.UPI, 'UPI'),
        (PaymentMode.CHEQUE_DD, 'CHEQUE_DD'),
    )

    add_date = models.DateTimeField(auto_now_add=True)
    bank_ref_number = models.CharField(max_length=255, unique=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    bank_name = models.CharField(max_length=255, blank=True, null=True)
    bank_acc_number = models.CharField(max_length=255, blank=True, null=True)
    remark = models.CharField(max_length=255, blank=True, null=True)
    reference_number = models.CharField(max_length=255, blank=True, null=True)
    cashslip = models.FileField(upload_to='profile_pics/', null=True, blank=True)
    payment_date = models.DateField(blank=True, null=True)
    transaction_status = models.SmallIntegerField(choices=STATUS, db_index=True)
    payment_mode = models.SmallIntegerField(choices=payment_choices, db_index=True)
    payment_remark = models.CharField(max_length=255, blank=True, null=True)
    approvedate = models.DateTimeField(blank=True, null=True)
    lastupdate = models.DateTimeField(blank=True, null=True)
    amount = models.FloatField()
    start_opening_balance = models.FloatField(blank=True, null=True)
    start_closing_balance = models.FloatField(blank=True, null=True)
    upd_opening_balance = models.FloatField(blank=True, null=True)
    upd_closing_balance = models.FloatField(blank=True, null=True)
    running_balance = models.FloatField(blank=True, null=True)

    def __str__(self):
        return self.user.name



class BBPSProviders(models.Model):
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
    provider_name = models.CharField(max_length=255, blank=True, null=True)
    type = models.SmallIntegerField(choices=BILL_TYPE, db_index=True, blank=True, null=True)
    Fields_Description = models.CharField(max_length=255, blank=True, null=True)


    def __str__(self):
        return self.provider_name

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
    number = models.CharField(max_length=255, blank=True, null=True)
    transaction_status = models.SmallIntegerField(choices=STATUS, db_index=True)
    amount = models.FloatField(blank=True, null=True)
    remark = models.CharField(max_length=255, blank=True, null=True)
    bill_type = models.SmallIntegerField(choices=BILL_TYPE, db_index=True)
    comission = models.FloatField(blank=True, null=True)
    transaction_id = models.CharField(max_length=255, blank=True, null=True)
    charge = models.CharField(max_length=255, blank=True, null=True)

    def get_transaction_status_display(self):
        return dict(self.STATUS).get(self.transaction_status, 'Unknown')

    def get_bill_type_display(self):
        return dict(self.BILL_TYPE).get(self.bill_type, 'Unknown')

    def get_user_display(self):
        return str(self.user) 

    def __str__(self):
        return f"{self.number} - {self.user}"

class Surcharge(models.Model):
    user =  models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    dmtflat_s101to2000 = models.FloatField(blank=True, null=True)
    dmtperc_s2001to5000  = models.FloatField(blank=True, null=True)
    dmtperc_s5001to10000  = models.FloatField(blank=True, null=True)
    dmtperc_s10001to50000  = models.FloatField(blank=True, null=True)
    dmtperc_s50001to100000  = models.FloatField(blank=True, null=True)
    dmtperc_s100001to500000  = models.FloatField(blank=True, null=True)
    dmtperc_s500001toall  = models.FloatField(blank=True, null=True)
    payoutflat_s101to2000 = models.FloatField(blank=True, null=True)
    payoutperc_s2001to5000  = models.FloatField(blank=True, null=True)
    payoutperc_s5001to10000  = models.FloatField(blank=True, null=True)
    payoutperc_s10001to50000  = models.FloatField(blank=True, null=True)
    payoutperc_s50001to100000  = models.FloatField(blank=True, null=True)
    payoutperc_s100001to500000  = models.FloatField(blank=True, null=True)
    payoutperc_s500001toall  = models.FloatField(blank=True, null=True)
    bbps_allperc = models.FloatField(blank=True, null=True)
    upiflat_s101to2000 = models.FloatField(blank=True, null=True)
    upiperc_s2001to5000  = models.FloatField(blank=True, null=True)
    upiperc_s5001to10000  = models.FloatField(blank=True, null=True)
    upiperc_s10001to50000  = models.FloatField(blank=True, null=True)
    upiperc_s50001to100000  = models.FloatField(blank=True, null=True)
    upiperc_s100001to500000  = models.FloatField(blank=True, null=True)
    upiperc_s500001toall  = models.FloatField(blank=True, null=True)

    def __str__(self):
        return f"{self.id} - {self.user}"

class State(models.Model):
    state_id = models.IntegerField(blank=True, null=True)
    state_name = models.CharField(max_length=255, blank=True, null=True)
    state_code = models.IntegerField(blank=True, null=True)
    country_id = models.IntegerField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_date = models.TimeField(blank=True, null=True)
    update_date = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.state_name

class TransactionDirection:
    DEBIT = 1
    CREDIT = 2

class WalletTransactions(models.Model):
    STATUS = (
		(TransactionStatus.PENDING, 'PENDING'),
		(TransactionStatus.FAILURE, 'FAILURE'),
		(TransactionStatus.SUCCESS, 'SUCCESS'),
	)
    TYPE = (
		(CompTransactionType.WALLET, 'WALLET'),
		(CompTransactionType.DMT, 'DMT'),
        (CompTransactionType.BBPS, 'BBPS'),
        (CompTransactionType.UPI,'UPI')
	)
    DIRECTION = (
        (TransactionDirection.DEBIT, 'DEBIT'),
        (TransactionDirection.CREDIT, 'CREDIT'),
    )
    
    transaction_direction = models.SmallIntegerField(choices=DIRECTION, db_index=True, null=True)
    ref_id = models.CharField(max_length=255, blank=True, null=True)
    user =  models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    transaction_status = models.SmallIntegerField(choices=STATUS, db_index=True,)
    amount = models.FloatField()
    transaction_type = models.SmallIntegerField(choices=TYPE, db_index=True,)
    add_date = models.DateTimeField(blank=True,null=True)
    opening_balance = models.FloatField(null=True)
    closing_balance = models.FloatField(null=True)
    charge = models.FloatField(blank=True, null=True)
    tds = models.FloatField(blank=True, null=True)
    comission = models.FloatField(blank=True, null=True)
    remark = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.ref_id} - {self.user.username}"
    def get_transaction_direction_display(self):
        return dict(self.DIRECTION)[self.transaction_direction]


@receiver(pre_save, sender=FundRequests)
def update_wallet_balance(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = FundRequests.objects.get(pk=instance.pk)
        except FundRequests.DoesNotExist:
            return
        if old_instance.transaction_status == TransactionStatus.PENDING and instance.transaction_status == TransactionStatus.SUCCESS:
            userwallet = UserWallet.objects.get(user_id=old_instance.user_id)
            userwallet.available_balance =  userwallet.available_balance + instance.amount
            userwallet.save()

class Zpaybeneficiary(models.Model):
    STATUS = (
		(TransactionStatus.PENDING, 'PENDING'),
		(TransactionStatus.FAILURE, 'FAILURE'),
		(TransactionStatus.SUCCESS, 'SUCCESS'),
	)
    created_at = models.DateTimeField(auto_now_add=True, primary_key=True,)
    id = models.CharField(max_length=255, blank=True, null=True)
    user =  models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    bank_acc_number = models.CharField(max_length=255, blank=True, null=True)
    bank_ifsc = models.IntegerField(blank=True, null=True)

class Wallet_to_Wallet_transaction(models.Model):
    STATUS = (
		(TransactionStatus.PENDING, 'PENDING'),
		(TransactionStatus.FAILURE, 'FAILURE'),
		(TransactionStatus.SUCCESS, 'SUCCESS'),
	)
    TYPE = (
		(CompTransactionType.WALLET, 'WALLET'),
	)
    DIRECTION = (
        (TransactionDirection.DEBIT, 'DEBIT'),
        (TransactionDirection.CREDIT, 'CREDIT'),
    )
    
    transaction_direction = models.SmallIntegerField(choices=DIRECTION, db_index=True, null=True)
    ref_id = models.CharField(max_length=255, blank=True, null=True)
    user =  models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    mobile = models.CharField(max_length=255, blank=True, null=True)
    sender = models.CharField(max_length=255, blank=True, null=True)
    receiver = models.CharField(max_length=255, blank=True, null=True)
    receivername = models.CharField(max_length=255, blank=True, null=True)
    transaction_status = models.SmallIntegerField(choices=STATUS, db_index=True,)
    amount = models.FloatField(blank=True, null=True)  
    transaction_type = models.SmallIntegerField(choices=TYPE, db_index=True,)
    add_date = models.DateTimeField(blank=True,null=True)

    def __str__(self):
        return f"{self.ref_id} - {self.user.username}"
    def get_transaction_direction_display(self):
        return dict(self.DIRECTION)[self.transaction_direction]

    
   
