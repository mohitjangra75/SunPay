from rest_framework import serializers
from .models import User, BankDetails, Bank, CompanyBank, BBPSTransactions, BBPSProviders,PaysprintBanks, State, UserWallet, FundRequests, Customer, WalletTransactions, ZpayBankDetail, DMTTransactions, Wallet_to_Wallet_transaction, Surcharge

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        username = validated_data.get('email')
        user = User.objects.create_user(username=username, **validated_data)
        UserWallet.objects.create(user=user, available_balance=0)
        return user

class BBPSTransactionSerializer(serializers.ModelSerializer):
    transaction_status_display = serializers.SerializerMethodField()
    bill_type_display = serializers.SerializerMethodField()
    user_display = serializers.SerializerMethodField()

    class Meta:
        model = BBPSTransactions
        fields = '__all__'

    def get_transaction_status_display(self, obj):
        return obj.get_transaction_status_display()

    def get_bill_type_display(self, obj):
        return obj.get_bill_type_display()

    def get_user_display(self, obj):
        return obj.get_user_display()
class BeneficiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = BankDetails
        fields = '__all__'

class BanksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = '__all__'

class CompanyBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyBank
        fields = '__all__'

class BBPSProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = BBPSProviders
        fields = '__all__'

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = '__all__'

class PaysprinrbankSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaysprintBanks
        fields = '__all__'

class FundRequestsSerializer(serializers.ModelSerializer):
    transaction_status_display = serializers.SerializerMethodField()
    payment_mode_display = serializers.SerializerMethodField()

    class Meta:
        model = FundRequests
        fields = '__all__'

    def get_transaction_status_display(self, obj):
        return obj.get_transaction_status_display()

    def get_payment_mode_display(self, obj):
        return obj.get_payment_mode_display()


class DmttransactionSerializer(serializers.ModelSerializer):
    transaction_status_display = serializers.SerializerMethodField()
    transaction_type_display = serializers.SerializerMethodField()
    user_display = serializers.SerializerMethodField()
    shopname = serializers.SerializerMethodField()

    class Meta:
        model = DMTTransactions
        fields = '__all__'

    def get_transaction_status_display(self, obj):
        return obj.get_transaction_status_display()

    def get_transaction_type_display(self, obj):
        return obj.get_transaction_type_display()

    def get_user_display(self, obj):
        if obj.user:
            return obj.user.username
        return 'Unknown User'
    
    def get_shopname(self, obj):
        if obj.user:
            return obj.user.shop_name
        return 'Unknown User'
   

class WalletTransactionSerializer(serializers.ModelSerializer):
    transaction_direction_display = serializers.SerializerMethodField()
    transaction_status_display = serializers.SerializerMethodField()
    transaction_type_display = serializers.SerializerMethodField()

    class Meta:
        model = WalletTransactions
        fields = '__all__'

    def get_transaction_status_display(self, obj):
        return obj.get_transaction_status_display()

    def get_transaction_direction_display(self, obj):
        try:
            return obj.get_transaction_direction_display()
        except KeyError:
            return "Unknown"  # or any default value you prefer

    def get_transaction_type_display(self, obj):
        try:
            return obj.get_transaction_type_display()
        except KeyError:
            return "Unknown"  # or any default value you prefer
 

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['customer_mobile', 'registered_with', 'is_active']

class ZpayBanks(serializers.ModelSerializer):
    class Meta:
        model = ZpayBankDetail
        fields = ['customer_mobile', 'registered_with', 'is_active']

class WallettoWalletTransactionSerializer(serializers.ModelSerializer):
    transaction_direction_display = serializers.SerializerMethodField()
    transaction_status_display = serializers.SerializerMethodField()
    transaction_type_display = serializers.SerializerMethodField()
    user_display = serializers.SerializerMethodField()

    class Meta:
        model = Wallet_to_Wallet_transaction
        fields = '__all__'  # Note the correct usage of '__all__' instead of '_all_'

    def get_transaction_direction_display(self, obj):
        # Implement this method to return the desired display value
        return obj.get_transaction_direction_display()

    def get_transaction_status_display(self, obj):
        # Implement this method to return the desired display value
        return obj.get_transaction_status_display()

    def get_transaction_type_display(self, obj):
        # Implement this method to return the desired display value
        return obj.get_transaction_type_display()
    
    def get_user_display(self, obj):
        # Implement this method to return the desired display value
        return obj.get_user_display()
      

    def get_transaction_status_display(self, obj):
        return obj.get_transaction_status_display()

    def get_transaction_direction_display(self, obj):
        try:
            return obj.get_transaction_direction_display()
        except KeyError:
            return "Unknown"  # or any default value you prefer

    def get_transaction_type_display(self, obj):
        try:
            return obj.get_transaction_type_display()
        except KeyError:
            return "Unknown"  # or any default value you prefer
        
class SurchargeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Surcharge
        fields = '__all__'
