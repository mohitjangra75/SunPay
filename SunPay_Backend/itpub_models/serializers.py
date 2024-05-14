from rest_framework import serializers
from .models import User, BankDetails, Bank, CompanyBank, BBPSProviders, State, UserWallet, UserTransactions, Customer, WalletTransactions

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

class UserTransactionSerializer(serializers.ModelSerializer):
    transaction_status=serializers.SerializerMethodField()
    class Meta:
        model = UserTransactions
        fields = ['id', 'created_at', 'bank_ref_number', 'user', 'bank_name' ,'bank_acc_number', 'remark',  'add_date' ,'payment_date', 'transaction_status', 'payment_mode', 'amount', 'opening_balance', 'running_balance']
    def get_transaction_status(self,obj):
        return obj.get_transaction_status_display()

class WalletTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WalletTransactions
        fields = '_all_'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['customer_mobile', 'registered_with', 'is_active']