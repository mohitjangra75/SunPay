from rest_framework import serializers
from .models import User, BankDetails, Bank, CompanyBank, BBPSProviders, State, UserWallet

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
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