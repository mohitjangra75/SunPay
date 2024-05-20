from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import UserSerializer, BanksSerializer, BeneficiarySerializer, CompanyBankSerializer, BBPSProviderSerializer, StateSerializer, CustomerSerializer, UserTransactionSerializer, PaysprinrbankSerializer
from .services import penny_drop,add_beneficary, del_beneficiary, query_remitter , register_remitter, fund_transfer, get_bill_details, pay_recharge, ansh_payout, send_otp, fetch_paysprintbeneficiary, zpay_verification, zpay_bankadd, zpay_transfer, zpay_upiadd, zpaygetallbeneficiary, zpaybeneficiarybyid, bank_verification
from .models import User, BankDetails, Bank, DMTTransactions, TransactionStatus, TransactionType, UserTransactions, BBPSTransactions, UserWallet, Package, CompanyBank, BBPSProviders, State, Customer, FundRequest, PaysprintBanks
import uuid
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from rest_framework import viewsets, status, mixins
from django.db import transaction
import requests

class RegisterUser(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            ip_address = request.META.get('REMOTE_ADDR')
            user = serializer.save(ip_address=ip_address)
            return Response({"message": "User created successfully", "user_id": user.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class GetUsers(APIView):
    def get(self, request, id=None): 
        if id is not None:
            try:
                user = User.objects.get(id=id)
                serializer = UserSerializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
class GetBanks(APIView):
    def get(self, request):
        try:
            bank = Bank.objects.all()
            serializer = BanksSerializer(bank, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Bank.DoesNotExist:
            return Response({"message": "Saved Bank not found"}, status=status.HTTP_404_NOT_FOUND)
    
class Companybank(APIView):
    def get(self, request):
        try:
            companybank = CompanyBank.objects.all()
            serializer = CompanyBankSerializer(companybank, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CompanyBank.DoesNotExist:
            return Response({"message": "Comapany Bank not found"}, status=status.HTTP_404_NOT_FOUND)

class BBPSproviders(APIView):
    def get(self, request):
        try:
            BBPS_Providers = BBPSProviders.objects.all()
            serializer = BBPSProviderSerializer(BBPS_Providers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except BBPSProviders.DoesNotExist:
            return Response({"message": "Provider does not exist"}, status=status.HTTP_404_NOT_FOUND)

class States(APIView):
    def get(self, request):
        try:
            States_saved = State.objects.all()
            serializer = StateSerializer(States_saved, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except State.DoesNotExist:
            return Response({"message": "State does not exist"}, status=status.HTTP_404_NOT_FOUND)

class Paysprintbanklist(APIView):
    def get(self, request):
        try:

            Pays_banks = PaysprintBanks.objects.all().order_by('bank_name')
            serializer = PaysprinrbankSerializer(Pays_banks, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except State.DoesNotExist:
            return Response({"message": "State does not exist"}, status=status.HTTP_404_NOT_FOUND)


class LoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        login_id = request.data.get('login_id')
        password = request.data.get('password')
        # print(login_id, password)
        if login_id and password:
            try:
                user = User.objects.get(username=login_id,password=password)
            except:
                return Response({"error": "Invalid login credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            if user:
                if user.is_tpin_enabled:
                    return Response({"message": "User Found Proceed with TPIN","verification_enabled":"tpin"}, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "User Found Proceed with OTP","verification_enabled":"otp"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid login credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"error": "login_id and password are required fields"}, status=status.HTTP_400_BAD_REQUEST)


class TPINVerification(APIView):
    def post(self, request, *args, **kwargs):
        tpin = request.data.get('tpin')
        username = request.data.get('login_id')
        password = request.data.get('password')
        # print(tpin, username, password)
        
        if not (username and password and tpin):
            return Response({"error": "login_id, password, and TPIN are required fields"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(username=username,password=password,tpin = tpin)
            return Response({"message": "Login Successful", "data": UserSerializer(user).data}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "Invalid login credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        
class LoginOTPView(APIView):
    def post(self, request):
        username = request.data.get('login_id')
        password = request.data.get('password')
        # print("Login OTP", username, password)
        if not (username and password):
            return Response({"error": "Username and Password are required fields"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(username=username, password=password)
            # print("Login OTP", user)
            if user is not None:
                otp_stored = send_otp(user.mobile)
                # print("Login OTP", send_otp)
                with transaction.atomic():
                    user.otp = otp_stored
                    user.save()
                # print("Stored OTP in user model:", otp_stored)
                return Response({'message': 'OTP sent to your registered mobile number.', 'otp_stored': otp_stored})
            else:
                return Response({'error': 'Invalid username or password.'}, status=400)
        except User.DoesNotExist:
            return Response({"error": "Invalid login credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class OTPVerification(APIView):
    def post(self, request):
        otp_entered = request.data.get('otp_entered')
        username = request.data.get('login_id')
        try:
            user = User.objects.get(username=username)
            otp_stored = user.otp
            # print("OTP entered:", otp_entered, "OTP stored:", otp_stored, "Username:", username)
            if not (otp_entered and username):
                return Response({"error": "OTP and Username are required fields."}, status=status.HTTP_400_BAD_REQUEST)
            if otp_entered == str(otp_stored):
                return Response({'message': 'Login successful', "data": UserSerializer(user).data },status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "Invalid login credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class AddBenAccount(APIView):
    def post(self, request, *args, **kwargs):
        beneficiary_name = request.data.get("beneficiary_name")
        account_number = request.data.get("bank_account_number")
        ifsc_code = request.data.get("bank_ifsc_code")
        mobile_number = request.data.get("mobile_number")
        bank_id = request.data.get("bank_id")
        pin_code = request.data.get("pin_code")
        address = request.data.get("address")
        dob = request.data.get("dob")

        payload = {
            "mobile": mobile_number,
            "benename": beneficiary_name,
            "bankid": bank_id,
            "accno": account_number,
            "ifsccode": ifsc_code,
            "verified": "0",
            "gst_state": "17",
            "dob": dob,
            "address": address,
            "pincode": pin_code
        }
        response = add_beneficary(payload)
        print("paysprint response", response)
        
        if response['data']['message'] == "Receiver account successfully added.":
            data = response.get("data")
            beneficiary_data = data.get("data")
            print(data)
            if data:
                bank_details = BankDetails.objects.get_or_create(
                    beneficiary_name=beneficiary_data.get("name"),
                    bank_name=beneficiary_data.get("bankname"),
                    account_number=beneficiary_data.get("accno"),
                    ifsc_code=beneficiary_data.get("ifsc"),
                    mobile_number=mobile_number,
                    registered_with=Customer.objects.get(customer_mobile=mobile_number),
                    bene_id=beneficiary_data.get("bene_id"),
            )
            return Response({"message": "Beneficiary Details uploaded successfully", "response":response}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Failed to add beneficiary"}, status=status.HTTP_400_BAD_REQUEST)

class PennyDrop(APIView):
    def post(self, request, *args, **kwargs):
        beneficiary_name = request.data.get("beneficiary_name")
        account_number = request.data.get("account_number")
        bene_id = request.data.get("bene_id")
        mobile_number = request.data.get("mobile_number")
        bank_id = request.data.get("bank_id")
        pin_code = request.data.get("pin_code")
        address = request.data.get("address")
        dob = request.data.get("dob")

        payload = {"mobile":mobile_number,
              	"accno":account_number,      	
                "bankid":bank_id,      	
                "benename":beneficiary_name,      	
                "referenceid":12345678190,    	
                "pincode":pin_code,      	
                "address":address,      	
                "dob":dob,      	
                "gst_state":"17",      	
                "bene_id":bene_id}

        response = penny_drop(payload)
        print("paysprint response", response)

        if response.get('status'):
            return Response({"message": "Penny drop done successfully", "response":response}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Failed to penny drop"}, status=status.HTTP_400_BAD_REQUEST)

class Bankverify(APIView):
    def post(self, request, *args, **kwargs):
        refid = request.data.get("refid")
        account_number = request.data.get("account_number")
        ifsc = request.data.get("ifsc")
        ifsc_details = request.data.get("ifsc_details")

        payload = {"refid":refid,
              	"account_number":account_number,      	
                "ifsc":ifsc,
                "ifsc_details":ifsc_details      	
                }

        response = bank_verification(payload)
        print("paysprint response", response)

        if response.get('status'):
            return Response({"message": "Bank verification successfully", "response":response}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Failed to verify Bank"}, status=status.HTTP_400_BAD_REQUEST)


class DelBenAccount(APIView):

    def post(self, request, *args, **kwargs):
        bene_id = request.data.get("bene_id")
        mobile_number = request.data.get("mobile_number")


        if not bene_id and not mobile_number:
            return Response({"error": "Please provide required fields"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user=User.objects.get(mobile_number=mobile_number)
        except:
            return Response({"error": "Invalid mobile number"}, status=status.HTTP_400_BAD_REQUEST)
    
        payload = {
            "mobile": mobile_number,
            "bene_id":bene_id
        }

        response = del_beneficiary(payload=payload)

        if response["status"]==True:
            bank_obj = BankDetails.objects.filter(
                mobile_number=mobile_number,
                registered_with=user,
                bene_id = bene_id,
            ).update(is_active=False)
            return Response({"message": "Details Deleted successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Invalid Details"}, status=status.HTTP_400_BAD_REQUEST)

class GetBeneficiaryLinked(APIView):
    def get(self, request, *args, **kwargs):
        mobile_number = request.query_params.get("mobile_number")
        if not mobile_number:
            return Response({"error": "Please add mobile_number in query params"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            customer = Customer.objects.get(mobile_number=mobile_number)
            data = BeneficiarySerializer(customer.bankdetails_set.filter(is_active=True), many=True)
            return Response({"data":data,})
        except:
            return Response({"error": "Invalid Details"}, status=status.HTTP_400_BAD_REQUEST)


# class RegisterRemitter(APIView):
#     def post(self, request, *args, **kwargs):
#         first_name = request.data.get("first_name")
#         last_name = request.data.get("last_name")
#         adress = request.data.get("adress")
#         pin_code = request.data.get("pin_code")
#         otp = request.data.get("otp")
#         stateresp = request.data.get("stateresp")
#         mobile_number = request.data.get("mobile_number")
#         dob = request.data.get("dob")
#         if not mobile_number:
#             return Response({"error": "Please add mobile_number in query params"}, status=status.HTTP_400_BAD_REQUEST)
        
#         payload = {
#             "mobile": mobile_number,
#             "firstname": first_name,
#             "lastname": last_name,
#             "address": adress,
#             "otp": otp,
#             "pincode": pin_code,
#             "dob" : dob,
#             "gst_state" : "17",
#             "bank3_flag" : "no",
#             "stateresp":stateresp}
#         response = register_remitter(payload=payload)
#         if response["status"]==True:
#             return Response({"data":response["data"],})
#         else:
#             return Response({"error": "Please register first to send money"}, status=status.HTTP_400_BAD_REQUEST)
        
class SendMoneyDMT(APIView):

    def post(self, request, *args, **kwargs):

        amount = request.data.get("amount")
        bene_id =request.data.get("bene_id")
        txntype = request.data.get("txn_type")
        referenceid =request.data.get("ref_id")
        amount =request.data.get("amount")
        pipe = request.data.get("pipe")
        mobile = request.data.get("mobile")
        tpin = request.data.get("tpin")
        surcharge = request.data.get("surcharge")
        user_id = request.data.get("user_id")
        bank_acc_number = request.data.get("bank_acc_number")
        remark = request.data.get("remark")

        if not amount and not bene_id and not txntype and not referenceid and not mobile and not tpin:
            return Response({"error": "Please provide required fields"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user=User.objects.get(id=user_id)
        except:
            return Response({"error": "Invalid mobile number"}, status=status.HTTP_400_BAD_REQUEST)
        wallet_obj = user.userwallet
        if not (amount+surcharge)<wallet_obj.available_balance:
            return Response({"error": "Insufficient Balance"}, status=status.HTTP_400_BAD_REQUEST)
        if not user.tpin == tpin:
            return Response({"error": "Invalid tpin"}, status=status.HTTP_400_BAD_REQUEST)

        wallet_obj.available_balance = wallet_obj.available_balance - (amount + surcharge)
        wallet_obj.save()
        main_wallet = UserWallet.objects.get(user_id=6)
        main_wallet.available_balance = main_wallet.available_balance + surcharge
        main_wallet.save()

        ref_id = str(uuid.uuid4()).replace('-', 'D')[1:21]
        payload = {"mobile":mobile,
             "referenceid":ref_id,     
             "pipe":pipe,     
             "pincode":"302020",
             "address":"UP",     
             "dob":"1995-02-05",
             "gst_state":"17",     
             "bene_id":bene_id,     
             "txntype":txntype,     
             "amount":amount}

        response = fund_transfer(payload)

        if response["status"]==True:
            tr_obj = DMTTransactions.objects.create(
                bank_acc_number=bank_acc_number,
                ref_id = ref_id, 
                user=user,  
                bene_id = bene_id, 
                transaction_status = TransactionStatus.SUCCESS,
                amount = amount,
                charge = surcharge,
                order_id = response["data"]["utr"],
                transaction_type = TransactionType.IMPS if txntype == "IMPS" else TransactionType.NEFT,
                payment_remark = remark
            )
        
            if user.parent_id:
                wallet_obj.refresh_from_db()
                wallet_obj.available_balance = wallet_obj.available_balance + (surcharge * 0.5 -  (surcharge*0.5)*0.05)
                wallet_obj.save()
                parent_user = UserWallet.objects.get(user_id=user.parent_id)
                parent_user.available_balance = parent_user.available_balance + (surcharge * 0.2 - (surcharge * 0.2)*0.05) 
                parent_user.save()
            else:
                wallet_obj.refresh_from_db()
                wallet_obj.available_balance = wallet_obj.available_balance + (surcharge * 0.7 -  (surcharge*0.7)*0.05)
                wallet_obj.save()


            return Response({"message": "Funds transferred successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Invalid Details"}, status=status.HTTP_400_BAD_REQUEST)

class FundRequest(APIView):
    def post(self, request, *args, **kwargs):
        amount = request.data.get("amount")
        bank_name = request.data.get("bank_name")
        bank_acc_number = request.data.get("bank_acc_number")
        ref_number = request.data.get("ref_number")
        payment_mode = request.data.get("payment_mode")
        payment_date = request.data.get("payment_date")
        remark = request.data.get("remark")
        username = request.data.get("username")
        add_date = request.data.get("add_date")
        print('amount',amount)
        if not all([amount, add_date,  ref_number, bank_acc_number, payment_mode, payment_date , remark, bank_name, username]):
            return Response({"error": "Invalid Details"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        try:
            wallet_obj = UserWallet.objects.get(user=user)
        except UserWallet.DoesNotExist:
            return Response({"error": "Wallet not found for the user"}, status=status.HTTP_404_NOT_FOUND)
        
        opening_balance = wallet_obj.available_balance if wallet_obj else 0.0
        running_balance = opening_balance + amount
        tr_obj = UserTransactions.objects.create(
            user=user,
            bank_name = bank_name,
            bank_ref_number=ref_number,
            bank_acc_number=bank_acc_number,
            remark=remark,
            payment_date=payment_date,
            transaction_status=TransactionStatus.PENDING,
            payment_mode=payment_mode,
            add_date = add_date,
            amount=amount,
            opening_balance=opening_balance,
            running_balance=running_balance
        )
        return Response({"message": "Successfully initiated fund request", "transaction_id": tr_obj.id})
    
    # def put(self, request, *args, **kwargs):
    #     transaction_id = request.data.get("transaction_id")
    #     if not transaction_id:
    #         return Response({"error": "Transaction ID is required"}, status=status.HTTP_400_BAD_REQUEST)
    #     try:
    #         tr_obj = UserTransactions.objects.get(id=transaction_id)
    #     except UserTransactions.DoesNotExist:
    #         return Response({"error": "Transaction not found"}, status=status.HTTP_404_NOT_FOUND)
    #     tr_obj.transaction_status = TransactionStatus.SUCCESS
    #     tr_obj.save()
    #     if tr_obj.transaction_status == TransactionStatus.SUCCESS:
    #         tr_obj.user.wallet_obj.update_balance(tr_obj.amount)
    #     else:
    #         tr_obj.delete()
    #         raise ValidationError("Transaction failed")
    #     return Response({"message": "Transaction status updated successfully"})
    
    # def get(self, request, id=None): 
    #     if id is not None:
    #         try:
    #             transaction = UserTransactions.objects.get(id=id)
    #             serializer = UserTransactionSerializer(transaction)
    #             return Response(serializer.data, status=status.HTTP_200_OK)
    #         except User.DoesNotExist:
    #             return Response({"message": "No transactions found"}, status=status.HTTP_404_NOT_FOUND)
    #     else:
    #         transactions = UserTransactions.objects.all()
    #         serializer = UserTransactionSerializer(transactions, many=True)
    #         return Response(serializer.data, status=status.HTTP_200_OK)

class GetBBPSTypes(APIView):

    def get(self, request, *args, **kwargs):
        bill_type = request.query_params.get("bill_type")
        if bill_type:
            querset = BBPSProviders.objects.filter(bill_type = bill_type)
            data = BBPSProviderSerializer(querset, many=True).data
            return Response(data)
        else:
            querset = BBPSProviders.objects.all()
            data = BBPSProviderSerializer(querset, many=True).data
            return Response(data)

class PayRecharge(APIView):
    def post(self, request, *args, **kwargs):
        number = request.data.get("number")
        provider_id = request.data.get("provider_id")
        amount = request.data.get("amount")
        client_id = request.data.get("client_id")
        billcontext = request.data.get("billcontext")

        if not (number and provider_id and client_id and amount and billcontext):
            return Response({"error":"Please fill number client_id and provider_id"})

        payload = {
            'number' :number,
            'provider_id' : provider_id,
            'amount' : amount,
            'client_id' : client_id,
            'user_id' : "9311395921",
            'api_token' :"1vuiyiyiniitnadhsalha$(%23$%(%26@)$@usow89342mdfu",
            'provider_code' :"NA",
            "bill_context" : billcontext
        }
        response = pay_recharge(payload=payload)
        if response["status"] == True:
            if response["data"]["status_id"]==1:
                tr_status = TransactionStatus.SUCCESS
            elif response["data"]["status_id"]==2:
                tr_status = TransactionStatus.FAILURE
            elif response["data"]["status_id"]==3:
                tr_status = TransactionStatus.PENDING

            obj_created = BBPSTransactions.objects.create(
                user_id = client_id,
                transaction_status = TransactionStatus.SUCCESS if response["data"]["status_id"]==1 else TransactionStatus.PENDING,
                remark = "{}|{}|{}|{}".format(response["data"]["message"],response["data"]["txnid"], response["data"]["operator_ref"], response["data"]["Operator Transaction ID"]),
                bill_type = tr_status,
            )
            return Response(response)
        else:
            return Response({"error":"Please try again later"})

class GetBillDetails(APIView):
    def post(self, request, *args, **kwargs):
        number = request.data.get("number")
        provider_id = request.data.get("provider_id")
        client_id = request.data.get("client_id")
        retailer_mobile = request.data.get("retailer_mobile")

        if not (number and provider_id and client_id and retailer_mobile):
            return Response({"error":"Please fill number client_id and provider_id"})

        payload = {
            'api_token' :"1vuiyiyiniitnadhsalha$(%23$%(%26@)$@usow89342mdfu",
            'number' :number,
            'provider_id' : provider_id,
            'user_id' : "9311395921",
            'client_id' : client_id,
            "Retailer_MobileNumber" : retailer_mobile
        }
        response = get_bill_details(payload=payload)
        if response["status"] == True:
            return Response(response)
        else:
            return Response({"error":"Please try again later", "Response":response})

class AnshPayout(APIView):
    def post(self, request, *args, **kwargs):

        account= request.data.get("account")
        ifsc= request.data.get("ifsc")
        amount= request.data.get("amount")
        tr_id = request.data.get("tr_id")

        if not (account and ifsc and amount and tr_id):
            return Response({"error":"Please fill details"})

        payload = {
            "Account": account,
            "IFSC": ifsc,
            "Amount": amount,
            "Transaction I'd" : tr_id
            }
        response = ansh_payout(payload=payload)
        if response["status"] == True:
            return Response(response)
        else:
            return Response({"error":"Please try again later"})

class UserViewset(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet
):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):

        user_id = self.kwargs["pk"]
        if not user_id:
            return Response(
                {"details": "Pass user id"}, status=status.HTTP_400_BAD_REQUEST
            )
        user = User.objects.get(id=user_id)


        serializer = UserSerializer(user)

        return Response(serializer.data)

    def create(self, request):

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            ip_address = request.META.get('REMOTE_ADDR')
            user = serializer.save(ip_address=ip_address)
            return Response({"message": "User created successfully", "user_id": user.id}, status=status.HTTP_201_CREATED)

        return Response("error occured please try again later", status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()

        serializer = UserSerializer(
            instance,
            data=request.data,
            partial=partial,
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User updated successfully", "user": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"message": "Unable to update user", "Error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        kwargs["partial"] = True
        return self.update(request, *args, **kwargs)



class GetPackageDetails(APIView):
    def get(self, request, *args, **kwargs):
        amount = request.query_params.get("amount")
        if not (amount):
            return Response({"error":"Please fill details"})
        try:
            package = Package.objects.get(start_value_gte=amount, end_value__lte=amount)
            return Response({"surcharge_amount":amount * package.surcharge if not package.is_flat else package.surcharge})
        except:
            return Response({"error":"Please try again later"})


class GetUsers(APIView):
    def get(self, request, id=None): 
        if id is not None:
            try:
                user = User.objects.get(id=id)
                serializer = UserSerializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

class CheckCustomer(APIView):
    def post(self, request):
        mobile_number = request.data.get('mobile_number')
        register_with_username = request.data.get('register_with')
        
        if not mobile_number:
            return Response({'error': 'Mobile number not provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not register_with_username:
            return Response({'error': 'Register with username not provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            try:
                register_with_user = User.objects.get(username=register_with_username)
            except User.DoesNotExist:
                return Response({'error': 'Register with user not found in User model'}, status=status.HTTP_400_BAD_REQUEST)
            
            customer = Customer.objects.filter(customer_mobile=mobile_number)
            if customer.exists():
                serializer = CustomerSerializer(customer.first())
                return Response({
                    "message": "Customer found",
                    "data": serializer.data,
                }, status=status.HTTP_200_OK)
            else:
                payload = {"mobile": mobile_number, "bank3_flag": "NO"}
                response = query_remitter(payload=payload)
                print("Response from query_remitter:", response)
                
<<<<<<< HEAD
                try:
                    user = User.objects.get(username=register_with)
                except User.DoesNotExist:
                    return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
                
=======
>>>>>>> 18c77cd5ea829d0f186015aaeb0bae4a6fae554e
                if response['data']['message'] == "Remitter details fetch successfully.":
                    remitter_data = response['data']['data']
                     # Retrieve the User instance
                    if(user):
                        new_customer = Customer.objects.create(
                        customer_firstname=remitter_data['fname'],
                        customer_lastname=remitter_data['lname'],
                        customer_mobile=remitter_data['mobile'],
<<<<<<< HEAD
                        registered_with=user,
=======
                        registered_with=register_with_user,
>>>>>>> 18c77cd5ea829d0f186015aaeb0bae4a6fae554e
                        is_active=True
                        )
                        serializer = CustomerSerializer(new_customer)
                        return Response({
                            "message": "Customer created from paysprint",
                            "data": serializer.data,
                        }, status=status.HTTP_200_OK)
                    else:
                        return Response({
                            "message": "Registered With User not found",
                        }, status=status.HTTP_200_OK)
                else:
                    return Response({
                        "message": "Customer not found. Paysprint also doesn't have the customer.",
                        "response": response,
                    }, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'Message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class RegisterRemitter(APIView):
    def post(self, request):
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        adress = request.data.get("address")
        pin_code = request.data.get("pin_code")
        otp = request.data.get("otp")
        stateresp = request.data.get("stateresp")
        mobile_number = request.data.get("mobile_number")
        dob = request.data.get("dob")
        registered_with = request.data.get("registered_with")
        
        # if not mobile_number:
        #     return Response({"error": "Please add mobile_number in query params"}, status=status.HTTP_400_BAD_REQUEST)
        
        payload = {
            "mobile": mobile_number,
            "firstname": first_name,
            "lastname": last_name,
            "address": adress,
            "otp": otp,
            "pincode": pin_code,
            "dob" : dob,
            "gst_state" : "17",
            "bank3_flag" : "no",
            "stateresp":stateresp}
        print(payload)
        response = register_remitter(payload=payload)
        if response["status"]==True:
            print(response)
            try:
                if response['data']['message'] == "Remitter already registered":
                    return Response({"message": "Customer already registered."}, status=status.HTTP_208_ALREADY_REPORTED)
                
                elif response['data']['message'] == "Remitter successfully registered":
                    customer_details =  Customer.objects.create(
                    customer_firstname = first_name,
                    customer_lastname = last_name,
                    customer_mobile = mobile_number,
                    registered_with_id=registered_with,
                    is_active = True
                )
                    return Response({"message": "Customer registered successfully."}, status=status.HTTP_400_BAD_REQUEST)
                
                elif response['data']['message'] == "Invalid OTP":
                    return Response({"message": "Invalid OTP"}, status=status.HTTP_401_UNAUTHORIZED)
                
                elif response['data']['message'] == "Mobile Number is not allowed to do remittance.":
                    return Response({"message": "Entered Mobile NUmber is not allowed to register"}, status=status.HTTP_401_UNAUTHORIZED)

                else:
                    return Response({"message": "Technical Error. Kindly contact to your admin"}, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response({"message": "Something Went Wrong. Please try again later."}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({"error": "Failed to add customer"}, status=status.HTTP_400_BAD_REQUEST)

     
class fetch_beneficiary(APIView):
    def post(self, request, *args, **kwargs):
        mobile_number = request.data.get('mobile_number')
        if not mobile_number:
            return Response({'error': 'Mobile number not provided'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            payload = {"mobile": mobile_number}
            response = fetch_paysprintbeneficiary(payload=payload)
            if response.get("status"):
                data = response.get("data").get("data")
                for d in data:
                    bank_details, _ = BankDetails.objects.get_or_create(
                        beneficiary_name=d['name'],
                        bank_name=d['bankname'],
                        account_number=d['accno'],
                        ifsc_code=d['ifsc'],
                        mobile_number=mobile_number,
                        registered_with=Customer.objects.get(customer_mobile=mobile_number),
                        bene_id=d['bene_id'],
                    )
                return Response({
                    "message": "Customer found",
                    "Response": data
                }, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Please verify details', Response:response}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("errorr",e)
            return Response({'Message': 'Customer not found, registering.'},status=status.HTTP_404_NOT_FOUND)
        # Assuming you are sending the mobile number in the request POST data
        # mobile_number = request.data.get('mobile_number')
        # if mobile_number:
        #     payload = {"mobile": mobile_number}
        #     response = fetch_paysprintbeneficiary(payload)
        #     if response.get("status"):
        #         return Response({"Response": response})
        #     else:
        #         return Response({'error':'Unable to fetch bank details'},response)
        # else:
        #     return Response({'Message': 'Kindly provide mobile number'})

class UpdateFundRequest(APIView):

    def post(self, request, *args, **kwargs):
        tr_id = request.data.get('transaction_id')
        if tr_id:
            tr = UserTransactions.objects.get(id=tr_id)
            tr.transaction_status=TransactionStatus.SUCCESS
            tr.save()
            return Response({'details':"updated succesfully"})
        else:
            return Response({'Message': 'Error occured'})

class GetFundRequest(APIView):

    def get(self, request, *args, **kwargs):
        user_id = request.query_params.get('user_id', None) 
        is_admin = request.query_params.get('is_admin', False) 
        if is_admin:
            user_transactions = UserTransactions.objects.all()
            data = UserTransactionSerializer(user_transactions,many=True).data
            return Response(data)
        if user_id:
            user_transactions = UserTransactions.objects.filter(user_id=user_id)
            data = UserTransactionSerializer(user_transactions,many=True).data
            return Response(data)
            
class UpdateFundRequest(APIView):

    def post(self, request, *args, **kwargs):
        tr_id = request.data.get('transaction_id')
        print(tr_id)
        if tr_id:
            tr = UserTransactions.objects.get(id=tr_id)
            tr.transaction_status=TransactionStatus.SUCCESS
            tr.save()
            return Response({'details':"updated succesfully"})
        else:
            return Response({'Message': 'Error occured'})

class GetFundRequest(APIView):

    def get(self, request, *args, **kwargs):
        user_id = request.query_params.get('user_id', None) 
        is_admin = request.query_params.get('is_admin', False) 
        if is_admin:
            user_transactions = UserTransactions.objects.all()
            data = UserTransactionSerializer(user_transactions,many=True).data
            return Response(data)
        if user_id:
            user_transactions = UserTransactions.objects.filter(user_id=user_id)
            data = UserTransactionSerializer(user_transactions,many=True).data
            return Response(data)


class zpayaddbankbeneficiary(APIView):
    def post(self, request, *args, **kwargs):

        name_of_account_holder = request.data.get("name_of_account_holder")
        email = request.data.get("email")
        phone = request.data.get("phone")
        bank_account_number = request.data.get("bank_account_number")
        bank_ifsc_code = request.data.get("bank_ifsc_code")

        if not (bank_account_number and bank_ifsc_code and name_of_account_holder and email and phone):
            return Response({"error":"Please fill details"})
        
        payload = {
            "bank_account_number": bank_account_number,
            "bank_ifsc_code": bank_ifsc_code,
            "name_of_account_holder": name_of_account_holder,
            "email": email,
            "phone": phone,
            "type" : "account_number"
        }
        response = zpay_bankadd(payload=payload)
        if( response["status"] == True):
            return Response(response)
        else:
            return Response({"error":"Please try again later"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class zpayaddvpabeneficiary(APIView):
    def post(self, request, *args, **kwargs):

        name_of_account_holder = request.data.get("name_of_account_holder")
        email = request.data.get("email")
        phone = request.data.get("phone")
        vpa = request.data.get("vpa")
        account_id = request.data.get("account_id")

        if not (vpa and name_of_account_holder and email and phone and account_id):
            return Response({"error":"Please fill details"})
        
        payload = {
            "type" : "vpa",
            "vpa": vpa,
            "name_of_account_holder": name_of_account_holder,
            "email": email,
            "phone": phone,
        }
        response = zpay_upiadd(payload=payload)
        if response["status"] == True:
            return Response(response)
        else:
            return Response({"error":"Please try again later"}, response)
        
class zpaygetbeneficiary(APIView):
    def get(self, request, *args, **kwargs):
        response = zpaygetallbeneficiary()
        if response["status"] == True:
            return Response(response)
        else:
            return Response({"Error":"Unable to get all beneficiaries"})
        
class zpaygetbeneficiarybyid(APIView):
    def get(self, request, *args, **kwargs):

        param1 = request.query_params.get('')
        response = zpaybeneficiarybyid(param1)
        if response["status"] == True:
            return Response(response)
        else:
            return Response({"Error":"Unable to get all beneficiaries"})

        
class zpayverification(APIView):
    def post(self, request, *args, **kwargs):

        bank_account_number= request.data.get("bank_account_number")
        bank_ifsc_code = request.data.get("bank_ifsc_code")
        merchant_reference_id = request.data.get("merchant_reference_id")

        if not (bank_account_number and bank_ifsc_code and merchant_reference_id):
            return Response({"error":"Please fill details"})
        
        payload = {
            "bank_account_number": bank_account_number,
            "bank_ifsc_code": bank_ifsc_code,
            "merchant_reference_id": merchant_reference_id,
            "force_penny_drop": False
        }
        response = zpay_verification(payload=payload)
        print('views resp', response)
        if isinstance(response, dict) and 'data' in response and 'status' in response['data']:
            if response['data']['status'] == "success":
                return Response({"Message": "Bank verified successfully", "Response":response}, status=status.HTTP_200_OK)
            if response['data']['status'] == "failed":
                return Response({"Message": "Details unverified", "Response":response}, status=status.HTTP_400_BAD_REQUEST)
            else:     
                return Response({"Message": "Something went wrong. Please verify details", "Response":response}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Handle unexpected response format
            return Response({"Message": "Bad request from Zpay", "Response":response}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class zpaybanktansfer(APIView):
    def post(self, request, *args, **kwargs):  
        ref_id = str(uuid.uuid4()).replace('-', 'D')[1:21]

        beneficiary_id = request.data.get("beneficiary_id")
        amount = request.data.get("amount")
        payment_remark = request.data.get("payment_remark")
        payment_mode = request.data.get("payment_mode")
        tpin = request.data.get("tpin")
        user_id = request.data.get("user_id")
        surcharge = request.data.get("surcharge")
    #   merchant_reference_id = request.data.get("merchant_reference_id")

        if not amount and not beneficiary_id and not payment_mode and not ref_id and not tpin:
            return Response({"error": "Please provide required fields"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user=User.objects.get(id=user_id)
            # surcharge = Package.get(surcharge)
        except:
            return Response({"error": "Invalid mobile number"}, status=status.HTTP_400_BAD_REQUEST)
        wallet_obj = user.userwallet_set.first()
        if not (amount+surcharge)<wallet_obj.available_balance:
            return Response({"error": "Insufficient Balance"}, status=status.HTTP_400_BAD_REQUEST)
        if not user.tpin == tpin:
            return Response({"error": "Invalid mpin"}, status=status.HTTP_400_BAD_REQUEST)

        wallet_obj.available_balance = wallet_obj.available_balance - (amount + surcharge)
        wallet_obj.save()
        main_wallet = UserWallet.objects.get(user_id=6)
        main_wallet.available_balance = main_wallet.available_balance + surcharge
        main_wallet.save()

        
        # payload = {
        #     "type":"account_number",
        #     "debit_account_id" : "va_iGTXTqO47awKr9OdhaF0km2Qe",
        #     "beneficiary_id": beneficiary_id,
        #     "amount": amount,
        #     "currency_code" : "inr",
        #     "payment_mode" : payment_mode,
        #     "merchant_reference_id": ref_id,
        #     "payment_remark": payment_remark,
        # }
        # response = fund_transfer(payload)
        tr_obj = DMTTransactions.objects.create(
                ref_id = ref_id, 
                user=user,  
                bene_id = beneficiary_id, 
                transaction_status = TransactionStatus.SUCCESS,
                amount = amount,
                charge = surcharge,
                # order_id = response["data"]["utr"],
                trasaction_type = TransactionType.IMPS if payment_mode == "IMPS" else TransactionType.NEFT
            )


        # if response["status"]==True:

        if user.parent_id:
                wallet_obj.refresh_from_db()
                wallet_obj.available_balance = wallet_obj.available_balance + (surcharge * 0.5 -  (surcharge*0.5)*0.05)
                wallet_obj.save()
                parent_user = UserWallet.objects.get(user_id=user.parent_id)
                parent_user.available_balance = parent_user.available_balance + (surcharge * 0.2 - (surcharge * 0.2)*0.05) 
                parent_user.save()
        else:
                wallet_obj.refresh_from_db()
                wallet_obj.available_balance = wallet_obj.available_balance + (surcharge * 0.7 -  (surcharge*0.7)*0.05)
                wallet_obj.save()


        return Response({"message": "Funds transferred successfully"}, status=status.HTTP_201_CREATED)
        # else:
        #     return Response({"error": "Invalid Details"}, status=status.HTTP_400_BAD_REQUEST)
        
    #     amount = request.data.get("amount")
    #     bene_id =request.data.get("bene_id")
    #     txntype = request.data.get("txn_type")
    #     referenceid =request.data.get("ref_id")
    #     amount =request.data.get("amount")
    #     pipe = request.data.get("pipe")
    #     mobile = request.data.get("mobile")
    #     mpin = request.data.get("mpin")
    #     surcharge = request.data.get("surcharge")
    #     user_id = request.data.get("user_id")

    #     if not amount and not bene_id and not txntype and not referenceid and not mobile and not mpin:
    #         return Response({"error": "Please provide required fields"}, status=status.HTTP_400_BAD_REQUEST)
    #     try:
    #         user=User.objects.get(id=user_id)
    #     except:
    #         return Response({"error": "Invalid mobile number"}, status=status.HTTP_400_BAD_REQUEST)
    #     wallet_obj = user.userwallet_set.first()
    #     if not (amount+surcharge)<wallet_obj.available_balance:
    #         return Response({"error": "Insufficient Balance"}, status=status.HTTP_400_BAD_REQUEST)
    #     if not user.mpin == mpin:
    #         return Response({"error": "Invalid mpin"}, status=status.HTTP_400_BAD_REQUEST)

    #     wallet_obj.available_balance = wallet_obj.available_balance - (amount + surcharge)
    #     wallet_obj.save()
    #     main_wallet = UserWallet.objects.get(user_id=1)
    #     main_wallet.available_balance = main_wallet.available_balance + surcharge
    #     main_wallet.save()

    #     ref_id = str(uuid.uuid4()).replace('-', 'D')[1:21]
    #     payload = {"mobile":mobile,
    #          "referenceid":ref_id,     
    #          "pipe":pipe,     
    #          "pincode":"302020",
    #          "address":"UP",     
    #          "dob":"1995-02-05",
    #          "gst_state":"17",     
    #          "bene_id":bene_id,     
    #          "txntype":txntype,     
    #          "amount":amount}

    #     response = fund_transfer(payload)

    #     if response["status"]==True:
    #         tr_obj = DMTTransactions.objects.create(
    #             ref_id = ref_id, 
    #             user=user,  
    #             bene_id = bene_id, 
    #             transaction_status = TransactionStatus.SUCCESS,
    #             amount = amount,
    #             charge = surcharge,
    #             order_id = response["data"]["utr"],
    #             trasaction_type = TransactionType.IMPS if txntype == "IMPS" else TransactionType.NEFT
    #         )
        
    #         if user.parent_id:
    #             wallet_obj.refresh_from_db()
    #             wallet_obj.available_balance = wallet_obj.available_balance + (surcharge * 0.5 -  (surcharge*0.5)*0.05)
    #             wallet_obj.save()
    #             parent_user = UserWallet.objects.get(user_id=user.parent_id)
    #             parent_user.available_balance = parent_user.available_balance + (surcharge * 0.2 - (surcharge * 0.2)*0.05) 
    #             parent_user.save()
    #         else:
    #             wallet_obj.refresh_from_db()
    #             wallet_obj.available_balance = wallet_obj.available_balance + (surcharge * 0.7 -  (surcharge*0.7)*0.05)
    #             wallet_obj.save()


    #         return Response({"message": "Funds transferred successfully"}, status=status.HTTP_201_CREATED)
    #     else:
    #         return Response({"error": "Invalid Details"}, status=status.HTTP_400_BAD_REQUEST)



    # def post(self, request, *args, **kwargs):

    #     beneficiary_id = request.data.get("beneficiary_id")
    #     amount = request.data.get("amount")
    #     merchant_reference_id = request.data.get("merchant_reference_id")
    #     payment_remark = request.data.get("payment_remark")
    #     payment_mode = request.data.get("payment_mode")
    #     if not (beneficiary_id and amount and merchant_reference_id and payment_remark):
    #         return Response({"error":"Please fill details"})
        
    #     payload = {
    #         "type":"account_number",
    #         "debit_account_id" : "va_iGTXTqO47awKr9OdhaF0km2Qe",
    #         "beneficiary_id": beneficiary_id,
    #         "amount": amount,
    #         "currency_code" : "inr",
    #         "payment_mode" : payment_mode,
    #         "merchant_reference_id": merchant_reference_id,
    #         "payment_remark": payment_remark,
    #     }
    #     response = zpay_transfer(payload=payload)
    #     if response["status"] == True:
    #         return Response(response)
    #     else:
    #         return Response({"error":"Please try again later"}, response)

class zpayupitansfer(APIView):
    def post(self, request, *args, **kwargs):

        beneficiary_id = request.data.get("beneficiary_id")
        amount = request.data.get("amount")
        merchant_reference_id = request.data.get("merchant_reference_id")
        payment_remark = request.data.get("payment_remark")
        if not (beneficiary_id and amount and merchant_reference_id and payment_remark):
            return Response({"error":"Please fill details"})
        
        payload = {
            "type":"vpa",
            "debit_account_id" : "va_iGTXTqO47awKr9OdhaF0km2Qe",
            "beneficiary_id": beneficiary_id,
            "amount": amount,
            "currency_code" : "inr",
            "merchant_reference_id": merchant_reference_id,
            "payment_remark": payment_remark,
        }
        response = zpay_transfer(payload=payload)
        if response["status"] == True:
            return Response(response)
        else:
            return Response({"error":"Please try again later"}, response)
             
# class Wallettowallet(APIView):

#     def post(self, request, *args, **kwargs):

#         amount = request.data.get("amount")
#         bene_id =request.data.get("bene_id")
#         amount =request.data.get("amount")
#         mobile = request.data.get("mobile")
#         mpin = request.data.get("mpin")
#         user_id = request.data.get("user_id")

#         if not amount and not bene_id  and not mobile and not mpin :
#             return Response({"error": "Please provide required fields"}, status=status.HTTP_400_BAD_REQUEST)
#         try:
#             user=User.objects.get(id=user_id)
#         except:
#             return Response({"error": "Invalid mobile number"}, status=status.HTTP_400_BAD_REQUEST)
#         wallet_obj = user.userwallet_set.first()
#         if not (amount)<wallet_obj.available_balance:
#             return Response({"error": "Insufficient Balance"}, status=status.HTTP_400_BAD_REQUEST)
#         if not user.mpin == mpin:
#             return Response({"error": "Invalid mpin"}, status=status.HTTP_400_BAD_REQUEST)

        
#         bene_user = UserWallet.objects.get(user_id=bene_id)
#         if(bene_user):
#             bene_user.available_balance = bene_user.available_balance + (amount) 
#             bene_user.save()

#             wallet_obj.refresh_from_db()
#             wallet_obj.available_balance = wallet_obj.available_balance + (amount)
#             wallet_obj.save()

#             ref_id = str(uuid.uuid4()).replace('-', 'D')[1:21]

#             if(ref_id):
#                 return Response({"message": "Amount transferred successfully"}, status=status.HTTP_201_CREATED)
#         else:
#             return Response({"error": "Invalid Details"}, status=status.HTTP_400_BAD_REQUEST)

