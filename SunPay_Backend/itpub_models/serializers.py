from rest_framework import serializers
from .models import User, BankDetails, BBPSModelFields, Bank, CompanyBank

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class BeneficiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = BankDetails
        fields = '__all__'


class BBPSFieldsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BBPSModelFields
        fields = '__all__'

class BanksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = '__all__'

class CompanyBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyBank
        fields = '__all__'