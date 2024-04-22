from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import UserSerializer, BanksSerializer, BeneficiarySerializer, CompanyBankSerializer, BBPSProviderSerializer, StateSerializer, CustomerSerializer, UserTransactionSerializer
from .services import add_beneficiary, del_beneficiary, query_remitter , register_remitter, fund_transfer, get_bill_details, pay_recharge, ansh_payout, send_otp, fetch_paysprintbeneficiary, zpay_verification, zpay_bankadd
from .models import User, BankDetails, Bank, DMTTransactions, TransactionStatus, TransactionType, UserTransactions, BBPSTransactions, UserWallet, Package, CompanyBank, BBPSProviders, State, Customer, FundRequest
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
        upi_id = request.data.get("upi_id")
        beneficiary_name = request.data.get("beneficiary_name")
        bank_name = request.data.get("bank_name")
        account_number = request.data.get("account_number")
        ifsc_code = request.data.get("ifsc_code")
        mobile_number = request.data.get("mobile_number")
        bene_id = request.data.get("bene_id")

        if not all([beneficiary_name, bank_name, account_number, ifsc_code, mobile_number]):
            return Response({"error": "Please provide all required fields"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(mobile=mobile_number)
            print(user.email)
        except User.DoesNotExist:
            return Response({"error": "User does not exist for the provided mobile number"}, status=status.HTTP_400_BAD_REQUEST)

        response = add_beneficiary(
            api_token='1vuiyiyiniitnadhsalha$(%23$%(%26@)$@usow89342mdfu',
            mobile_number=mobile_number,
            bene_name=beneficiary_name,
            number=bene_id,
            bank_account=account_number,
            bank_name=bank_name,
            ifsc=ifsc_code,
            user_id=user.username,
            partnerSubId=9311395921
        )
        print("sending response")

        if response["status_id"] == 25:
            bank_details = BankDetails.objects.create(
                upi_id=upi_id,
                beneficiary_name=beneficiary_name,
                bank_name=bank_name,
                account_number=account_number,
                ifsc_code=ifsc_code,
                mobile_number=mobile_number,
                registered_with=user
            )
            return Response({"message": "Details uploaded successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Failed to add beneficiary"}, status=status.HTTP_400_BAD_REQUEST)


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
        account_number = request.query_params.get("account_number")
        if account_number:
            bank_details = BeneficiarySerializer(BankDetails.objects.get(account_number=account_number))
            return Response({"data":bank_details.data, })
        if not mobile_number:
            return Response({"error": "Please add mobile_number in query params"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user=BankDetails.objects.get(mobile_number = mobile_number)
        except:
            return Response({"error": "Invalid Details"}, status=status.HTTP_400_BAD_REQUEST)
        
        payload = {"mobile": mobile_number,"bank3_flag": "NO"}
        response = query_remitter(payload=payload)
        if response["status"]==True:
            data = BeneficiarySerializer(user.bankdetails_set.filter(is_active=True), many=True)
            return Response({"data":data, "query_rem_value":response["data"]})
        else:
            return Response({"error": "Please register first to send money"}, status=status.HTTP_400_BAD_REQUEST)


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
        mpin = request.data.get("mpin")
        surcharge = request.data.get("surcharge")
        user_id = request.data.get("user_id")

        if not amount and not bene_id and not txntype and not referenceid and not mobile and not mpin:
            return Response({"error": "Please provide required fields"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user=User.objects.get(id=user_id)
        except:
            return Response({"error": "Invalid mobile number"}, status=status.HTTP_400_BAD_REQUEST)
        wallet_obj = user.userwallet_set.first()
        if not (amount+surcharge)<wallet_obj.available_balance:
            return Response({"error": "Insufficient Balance"}, status=status.HTTP_400_BAD_REQUEST)
        if not user.mpin == mpin:
            return Response({"error": "Invalid mpin"}, status=status.HTTP_400_BAD_REQUEST)

        wallet_obj.available_balance = wallet_obj.available_balance - (amount + surcharge)
        wallet_obj.save()
        main_wallet = UserWallet.objects.get(user_id=1)
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
                ref_id = ref_id, 
                user=user,  
                bene_id = bene_id, 
                transaction_status = TransactionStatus.SUCCESS,
                amount = amount,
                charge = surcharge,
                order_id = response["data"]["utr"],
                trasaction_type = TransactionType.IMPS if txntype == "IMPS" else TransactionType.NEFT
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
        if not all([amount, ref_number, bank_acc_number, payment_mode, payment_date , remark, bank_name,add_date ,username]):
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
            return Response({"error":"Please try again later"})

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
        # Assuming you are sending the mobile number in the request POST data
        mobile_number = request.data.get('mobile_number')
        
        if mobile_number:
            try:
                customer = Customer.objects.get(customer_mobile=mobile_number)
                print(customer)
                payload = {"mobile": mobile_number,"bank3_flag": "NO"}
                response = query_remitter(payload=payload)
                print(response)
                if response["status"]==True:
                    payload = {"mobile": mobile_number}
                    serializer = CustomerSerializer(customer)
                    return Response({"message": "Customer found", "data":serializer.data, "Response": response }, status=status.HTTP_200_OK)  
                          
            except Customer.DoesNotExist:
                return JsonResponse({'Message': 'Customer not found registering.'}, status=404)
        else:
            return Response({'error': 'Mobile number not provided'}, status=400)

class RegisterRemitter(APIView):
    def post(self, request):
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        adress = request.data.get("adress")
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
        response = register_remitter(payload=payload)
        
        if response["status"]==True:
            if response["status_id"] == 25:
                customer_details =  Customer.objects.create(
                    customer_firstname = first_name,
                    customer_lastname = last_name,
                    customer_mobile = mobile_number,
                    registered_with=registered_with,
                    is_active = True
                )
                return Response({"message": "Customer registered successfully"}, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Failed to add customer"}, status=status.HTTP_400_BAD_REQUEST)

     
class fetch_beneficiary(APIView):
    def post(self,request):
        # Assuming you are sending the mobile number in the request POST data
        mobile_number = request.data.get('mobile_number')
        if mobile_number:
            payload = {"mobile": mobile_number}
            response = fetch_paysprintbeneficiary(payload)
            if response["status"]==True:
                return Response(response)
            else:
                return Response({'error':'Unable to fetch bank details'})
        else:
            return Response({'Message': 'Kindly provide mobile number'})

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
            "phone": phone
        }
        response = zpay_bankadd(payload=payload)
        if response["status"] == True:
            return Response(response)
        else:
            return Response({"error":"Please try again later"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class zpaygetbeneficiary(APIView):
    def get(self, request, *args, **kwargs):
        headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization" : "Bearer ak_live_CYlUjZ3HgAI84thmh0qtK5pUr6Ar6LKQ6FNC:sk_live_2vzdx3JgIqFvQrMGsApgsNcHrmTUOeuwh1OG"
        }
        url = "https://api.zwitch.io/v1/accounts/va_iGTXTqO47awKr9OdhaF0km2Qe/beneficiaries?results_per_page=100"

        response = requests.get(url, headers=headers)
        if response.ok:
            return Response(response.json())
        else:
            print(response.json())
            return {"status":False,
            "data":"Please verify details"}
        

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

