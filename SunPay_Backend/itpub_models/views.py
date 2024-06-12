from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import UserSerializer, BanksSerializer, BeneficiarySerializer, CompanyBankSerializer, BBPSProviderSerializer, StateSerializer, CustomerSerializer, FundRequestsSerializer, PaysprinrbankSerializer, DmttransactionSerializer, WalletTransactionSerializer, WallettoWalletTransactionSerializer, BBPSTransactionSerializer, SurchargeSerializer
from .services import penny_drop,add_beneficary, del_beneficiary, query_remitter , register_remitter, fund_transfer, get_bill_details, pay_recharge, ansh_payout, send_otp, fetch_paysprintbeneficiary, zpay_verification, zpay_bankadd, zpay_transfer, zpay_upiadd, zpaygetallbeneficiary, zpaybeneficiarybyid, bank_verification
from .models import User, BankDetails, Bank, DMTTransactions, TransactionStatus, TransactionType, FundRequests, BBPSTransactions, UserWallet, Surcharge, CompanyBank, BBPSProviders, State, Customer, FundRequest, PaysprintBanks, ZpayBankDetail, WalletTransactions, CompTransactionType, TransactionDirection, Wallet_to_Wallet_transaction, Surcharge
import uuid
import random
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from rest_framework import viewsets, status, mixins
from django.db import transaction
import requests
from ip2geotools.databases.noncommercial import DbIpCity
from django.utils import timezone
from django.db.models import Q  
import re
from datetime import datetime

class RegisterUser(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            ip_address = request.META.get('REMOTE_ADDR')
            latitude, longitude = None, None
            try:
                response = DbIpCity.get(ip_address, api_key='free')
                latitude = response.latitude
                longitude = response.longitude
            except Exception as e:
                print("Error getting location:", e)
            user = serializer.save(ip_address=ip_address, latitude=latitude, longitude=longitude)
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

def generate_otp(length=4):
    digits = "0123456789"
    otp = ''.join(random.choice(digits) for _ in range(length))
    return otp

class LoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        login_id = request.data.get('login_id')
        password = request.data.get('password')
        # print(login_id, password)
        if login_id and password:
            if re.fullmatch(r'\d{10}', login_id):
                try:
                    user = User.objects.get(mobile=login_id,password=password)
                except:
                    return Response({"error": "Invalid login credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            else: 
                try:
                    user = User.objects.get(username=login_id,password=password)    
                except:
                    return Response({"error": "Invalid login credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            
            if user:
                if user.is_tpin_enabled:
                    return Response({"message": "User Found Proceed with TPIN","verification_enabled":"tpin"}, status=status.HTTP_200_OK)
                else:
                    gotp = generate_otp()
                    send_otp(user.mobile, gotp)
                    user.otp = gotp
                    user.save()
                    print(user.otp, gotp)
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
            if re.fullmatch(r'\d{10}', username):
                try:
                    print(username)
                    user = User.objects.get(mobile=username,password=password,tpin = tpin)
                    user.last_login=timezone.now()
                    print(user)
                    return Response({"message": "Login Successful", "data": UserSerializer(user).data}, status=status.HTTP_200_OK)
                except:
                    return Response({"error": "Invalid login credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                try:
                    user = User.objects.get(username=username,password=password,tpin = tpin)
                    return Response({"message": "Login Successful", "data": UserSerializer(user).data}, status=status.HTTP_200_OK)
                except:
                    return Response({"error": "Invalid login credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({"error": "Invalid login credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class OTPVerification(APIView):
    def post(self, request):
        otp = request.data.get('otp')
        username = request.data.get('login_id')
        password = request.data.get('password')

        if re.fullmatch(r'\d{10}', username):
            try:
                user = User.objects.get(mobile=username,password=password)
            except:
                return Response({"error": "Invalid login credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        else: 
                try:
                    user = User.objects.get(username=username,password=password) 
                    print(user)   
                except:
                    return Response({"error": "Invalid login credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            
        if user:
            try:
                otp_stored = user.otp
                if not (otp and username):
                    return Response({"error": "OTP and Username are required fields."}, status=status.HTTP_400_BAD_REQUEST)
                if otp == otp_stored:
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

class GetAccountLinked(APIView):
    def get(self, request, *args, **kwargs):
        account_number = request.query_params.get("account_number")
        if not account_number:
            return Response({"error": "Please add account_number in query params"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            bank_details = BankDetails.objects.get(account_number=account_number)
            serializer = BeneficiarySerializer(bank_details)
            return Response({"Message": "Account Found", "Response": serializer.data}, status=status.HTTP_200_OK)
        except BankDetails.DoesNotExist:
            return Response({"Message": "Account not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
       
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
        
        # ref_id = str(uuid.uuid4()).replace('-', 'D')[1:21]
        ref_id = ''.join([str(random.randint(0, 9)) for _ in range(12)])


        tr_obj = DMTTransactions.objects.create(
                bank_acc_number=bank_acc_number,
                ref_id = ref_id, 
                user=user,  
                bene_id = bene_id, 
                transaction_status = TransactionStatus.PENDING,
                amount = amount,
                charge = surcharge,
                # order_id = response["data"]["utr"],
                transaction_type = TransactionType.IMPS if txntype == "IMPS" else TransactionType.NEFT,
                payment_remark = remark
            )
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

        # response = fund_transfer(payload)

        # if response["status"]==True:
        response = True
        if response == True:
            tr_obj.order_id = "1234try"
            tr_obj.transaction_status = TransactionStatus.SUCCESS
            tr_obj.save()
        
            if user.parent_id:
                dicashback = user.diback
                retcashback = user.retback
                print('di cashback',dicashback)
                print('retailer cashback',retcashback)
                wallet_obj.refresh_from_db()
                wallet_obj.available_balance = wallet_obj.available_balance + (surcharge * retcashback -  (retcashback*0.5)*0.05)
                wallet_obj.save()
                parent_user = UserWallet.objects.get(user_id=user.parent_id)
                print('parent wallet',parent_user)
                parent_user.available_balance = parent_user.available_balance + (surcharge * dicashback - (dicashback * 0.2)*0.05) 
                parent_user.save()
                main_wallet = UserWallet.objects.get(user_id=6)
                print('company wallet',main_wallet)
                main_wallet.available_balance = main_wallet.available_balance + (surcharge - ( (surcharge * retcashback -  (surcharge*retcashback)*0.05) + (surcharge * dicashback - (surcharge * dicashback)*0.05) ))
                main_wallet.save()
            else:
                wallet_obj.refresh_from_db()
                wallet_obj.available_balance = wallet_obj.available_balance + (surcharge * retcashback -  (surcharge*retcashback)*0.05)
                wallet_obj.save()
                main_wallet = UserWallet.objects.get(user_id=6)
                main_wallet.available_balance = main_wallet.available_balance + (surcharge - (surcharge * retcashback -  (surcharge*retcashback)*0.05) )
                main_wallet.save()


            return Response({"message": "Funds transferred successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"transaction created": "Transaction Created"}, status=status.HTTP_400_BAD_REQUEST)

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

        if not all([amount, ref_number, bank_acc_number, payment_mode, payment_date, remark, bank_name, username]):
            return Response({"error": "Invalid Details"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            wallet_obj = UserWallet.objects.get(user=user)
        except UserWallet.DoesNotExist:
            return Response({"error": "Wallet not found for the user"}, status=status.HTTP_404_NOT_FOUND)

        try:
            # Convert payment_date to a date object if it's a valid string
            payment_date_obj = datetime.strptime(payment_date, "%Y-%m-%d").date()
        except (ValueError, TypeError):
            return Response({"error": "Invalid date format. Expected YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

        opening_balance = wallet_obj.available_balance if wallet_obj else 0.0
        running_balance = wallet_obj.available_balance
        ref_id = ''.join([str(random.randint(0, 9)) for _ in range(12)])

        WalletTransactions.objects.create(
            transaction_direction=TransactionDirection.DEBIT,
            user=user,
            ref_id=ref_id,
            transaction_status=TransactionStatus.PENDING,
            amount=amount,
            add_date=timezone.now(),
            transaction_type=CompTransactionType.WALLET,
            opening_balance=opening_balance,
            closing_balance=opening_balance
        )

        tr_obj = FundRequests.objects.create(
            user=user,
            bank_name=bank_name,
            bank_ref_number=ref_number,
            bank_acc_number=bank_acc_number,
            remark=remark,
            reference_number=ref_id,
            payment_date=payment_date_obj,
            transaction_status=TransactionStatus.PENDING,
            payment_mode=payment_mode,
            add_date=timezone.now(),
            amount=amount,
            start_opening_balance =opening_balance,
            start_closing_balance=running_balance,
            upd_opening_balance = 0.0,
            upd_closing_balance = 0.0
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
            'user_id' : "",
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

class PaydummyRecharge(APIView):
    def post(self, request, *args, **kwargs):
        number = request.data.get("number")
        provider_id = request.data.get("provider_id")
        amount = request.data.get("amount")
        client_id = request.data.get("client_id")
        billcontext = request.data.get("billcontext")
        user_id = request.data.get("user_id")
        billtype = request.data.get("billtype")

        print(number, provider_id, client_id, amount, billcontext, user_id, billtype)
        if not (number and provider_id and client_id and amount and billcontext and user_id and billtype):
            return Response({"error": "Please fill number client_id and provider_id"})
        else:
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return Response({"error": "Invalid user ID"}, status=status.HTTP_400_BAD_REQUEST)

            if user:
                
                userwallet = UserWallet.objects.get(user_id=user.id)
                surchargeobj = Surcharge.objects.get(user=user)
                retcashback = user.rechretback
                dicashback = user.rechdiback
                rref_id = ''.join([str(random.randint(0, 9)) for _ in range(12)])
                ropenbalance = userwallet.available_balance
                surcharge = (amount * surchargeobj.bbps_allperc)
                parentid = user.parent_id
                

                if ((amount + (amount * surcharge)) > userwallet.available_balance):
                    return Response({"error": "You don't have sufficient balance in your wallet."})
                else:
                    userwallet.available_balance -= amount + (amount * surcharge)
                    userwallet.save()  # Don't forget to save the wallet

                    bbpstr = BBPSTransactions.objects.create(
                        bill_type=billtype,
                        transaction_status=TransactionStatus.SUCCESS,
                        number = number,
                        user=user,
                        amount = amount,
                        charge = surcharge,
                        created_at=timezone.now(),
                        transaction_id=rref_id,
                        remark=billcontext,
                    )

                    wallobj = WalletTransactions.objects.create(
                        user=user,
                        ref_id=rref_id,
                        transaction_direction=TransactionDirection.DEBIT,
                        add_date=timezone.now(),
                        transaction_status=TransactionStatus.PENDING,
                        amount=amount,
                        charge = surcharge,
                        transaction_type=CompTransactionType.BBPS,
                        opening_balance=ropenbalance,
                        closing_balance=userwallet.available_balance,
                        remark=f"Bill Pay: {billtype}#{number}",
                    )

                    response = True
                    if response == True:
                        retcomission = (surcharge * retcashback - (surcharge * retcashback) * 0.05)
                        dicomission = (surcharge * dicashback - (surcharge * dicashback) * 0.05)

                        # Updating user wallet & BBPS trans comission
                        userwallet.available_balance += userwallet.available_balance + retcomission
                        bbpstr.comission = retcomission
                        bbpstr.save()
                        wallobj.comission = retcomission
                        wallobj.transaction_status = TransactionStatus.SUCCESS
                        wallobj.save()  # Don't forget to save the WalletTransaction

                        # DI cashback comission trans create & Update DI wallet with cashback
                        parentuserwallet = UserWallet.objects.get(user_id=parentid)
                        

                        if parentuserwallet:
                            print(parentuserwallet)
                            popenbalance = parentuserwallet.available_balance
                            parentuserwallet.available_balance += dicomission 
                            parentuserwallet.save()
                        
                            WalletTransactions.objects.create(
                                user_id=parentid,
                                ref_id=rref_id,
                                transaction_direction=TransactionDirection.CREDIT,
                                add_date=timezone.now(),
                                transaction_status=TransactionStatus.SUCCESS,
                                amount=(surcharge * dicashback),
                                transaction_type=CompTransactionType.BBPS,
                                tds = ((surcharge * dicashback) * 0.05),
                                opening_balance=popenbalance,
                                closing_balance=parentuserwallet.available_balance,
                                remark=f"Cashback for Bill Pay: {billtype}#{number}",
                                comission=dicomission  # Save the DI comission
                            )
                            transaction_data = BBPSTransactionSerializer(bbpstr).data
                            return Response({"message": "Transaction created successfully", "transaction":transaction_data}, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Pass user ID"})

class GetBillDetails(APIView):
    def post(self, request, *args, **kwargs):
        number = request.data.get("number")
        provider_id = request.data.get("provider_id")
        client_id = request.data.get("client_id")
        retailer_mobile = request.data.get("retailer_mobile")

        if not (number and provider_id and client_id and retailer_mobile):
            return Response({"error":"Please fill number client_id and provider_id"})

        payload = {
            'api_token' :"JGWYCBMaoMM9PGknp6u6xFAVHsdwZlPWlJJIMlXZqME1F7vsE8p576YsNKV3",
            'number' :number,
            'provider_id' : provider_id,
            'user_id' : "216",
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

class GetSurchargeDetails(APIView):
    def get(self, request, *args, **kwargs):
        amount = request.query_params.get("amount")
        if not (amount):
            return Response({"error":"Please fill details"})
        try:
            Surcharge = Surcharge.objects.get(start_value_gte=amount, end_value__lte=amount)
            return Response({"surcharge_amount":amount * Surcharge.surcharge if not Surcharge.is_flat else Surcharge.surcharge})
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
                
                try:
                    user = User.objects.get(username=register_with_user)
                except User.DoesNotExist:
                    return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
                
                if response['data']['message'] == "Remitter details fetch successfully.":
                    remitter_data = response['data']['data']
                     # Retrieve the User instance
                    if(user):
                        new_customer = Customer.objects.create(
                        customer_firstname=remitter_data['fname'],
                        customer_lastname=remitter_data['lname'],
                        customer_mobile=remitter_data['mobile'],
                        registered_with=user,
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
            # payload = {"mobile": mobile_number}
            # response = fetch_paysprintbeneficiary(payload=payload)
            # if response.get("status"):
            #     data = response.get("data").get("data")
            #     for d in data:        
            #         bank_details, _ = BankDetails.objects.get_or_create(
            #                 beneficiary_name=d['name'],
            #                 bank_name=d['bankname'],
            #                 account_number=d['accno'],
            #                 ifsc_code=d['ifsc'],
            #                 mobile_number=mobile_number,
            #                 registered_with=Customer.objects.get(customer_mobile=mobile_number),
            #                 bene_id=d['bene_id'],
            #         )
            #         return Response({
            #             "message": "Customer found",
            #             "Response": bank_details
            #         }, status=status.HTTP_200_OK)
            # else:
            #     return Response({'message': 'Please verify details', Response:response}, status=status.HTTP_400_BAD_REQUEST)
            bank_details = BankDetails.objects.filter(mobile_number=mobile_number)
            print(bank_details)
            if bank_details.exists():
                serializer = BeneficiarySerializer(bank_details, many=True)
                return Response({
                    "message": "Beneficiaries found",
                    "data": serializer.data,
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "message": "No beneficiaries found for this mobile number",
                }, status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            print("errorr",e)
            return Response({'Message': 'Customer not found, registering.'},status=status.HTTP_404_NOT_FOUND)
       
# class UpdateFundRequest(APIView):

#     def post(self, request, *args, **kwargs):
#         tr_id = request.data.get('transaction_id')
#         if tr_id:
#             tr = FundRequests.objects.get(id=tr_id)
#             tr.transaction_status=TransactionStatus.SUCCESS
#             tr.save()
#             return Response({'details':"updated succesfully"})
#         else:
#             return Response({'Message': 'Error occured'})

class GetFundRequest(APIView):

    def get(self, request, *args, **kwargs):
        user_id = request.query_params.get('user_id', None) 
        is_admin = request.query_params.get('is_admin', False) 
        if is_admin:
            user_transactions = FundRequests.objects.all()
            data = FundRequests(user_transactions,many=True).data
            return Response(data)
        if user_id:
            user_transactions = FundRequests.objects.filter(user_id=user_id)
            data = FundRequestsSerializer(user_transactions,many=True).data
            return Response(data)
            
class UpdateFundRequest(APIView):

    def post(self, request, *args, **kwargs):
        tr_id = request.data.get('transaction_id')
        action = request.data.get("action")
        amount = request.data.get("amount")
        bank_name = request.data.get("bank_name")
        bank_acc_number = request.data.get("bank_acc_number")
        ref_number = request.data.get("ref_number")
        payment_mode = request.data.get("payment_mode")
        payment_date = request.data.get("payment_date")
        remark = request.data.get("remark")
        upduser = request.data.get("upduser")

        if tr_id and action:
            try:
                fundtran = FundRequests.objects.get(reference_number=tr_id)
                walltrans = WalletTransactions.objects.get(ref_id=tr_id)

            except FundRequests.DoesNotExist:
                return Response({'Error': 'Transaction ID not found.'}, status=status.HTTP_404_NOT_FOUND)

            if action == "APPROVE":
                try:
                    comuser = User.objects.get(id=upduser)
                    user = User.objects.get(username=fundtran.user)
                    userwallet = UserWallet.objects.get(user_id=user.id)
                except (WalletTransactions.DoesNotExist, User.DoesNotExist, UserWallet.DoesNotExist) as e:
                    return Response({'Error': str(e)}, status=status.HTTP_404_NOT_FOUND)
                
                if fundtran.transaction_status == TransactionStatus.SUCCESS:
                    return Response({'Error': 'Already Approved.'}, status=status.HTTP_200_OK)
                
                else:
                    fundtran.upd_opening_balance = userwallet.available_balance
                    fundtran.save()

                    userwallet.available_balance += fundtran.amount
                    userwallet.save()

                    fundtran.upd_closing_balance = userwallet.available_balance
                    fundtran.running_balance = userwallet.available_balance
                    fundtran.transaction_status = TransactionStatus.SUCCESS
                    fundtran.approvedate = timezone.now()
                    fundtran.lastupdate = timezone.now()
                    fundtran.payment_remark = f"FUNDREQUEST {action} by {comuser.name}" 
                    fundtran.save()
                    walltrans.closing_balance = userwallet.available_balance
                    walltrans.STATUS=fundtran.transaction_status
                    walltrans.save()


                    return Response({'Message': "Updated successfully"}, status=status.HTTP_200_OK)

            elif action == "UPDATE":
                try:
                    user = User.objects.get(username=fundtran.user)
                    userwallet = UserWallet.objects.get(user_id=user.id)
                except User.DoesNotExist:
                    return Response({'Error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
                if fundtran.transaction_status == TransactionStatus.REINITIATE:
                    fundtran.bank_acc_number = bank_acc_number
                    fundtran.amount = amount
                    fundtran.bank_name = bank_name
                    fundtran.bank_ref_number = ref_number
                    fundtran.payment_mode = payment_mode
                    fundtran.payment_date = payment_date
                    fundtran.remark = remark
                    fundtran.transaction_status = TransactionStatus.PENDING
                    fundtran.lastupdate = timezone.now()
                    fundtran.payment_remark = f"FUNDREQUEST {action} by {user.name}"
                    fundtran.save()
                    walltrans.closing_balance = userwallet.available_balance
                    walltrans.STATUS=fundtran.transaction_status
                    walltrans.save()
                    return Response({'Message': "Updated successfully"}, status=status.HTTP_200_OK)
                else:
                    return Response({'Error': 'Re-Initiate not possible.'}, status=status.HTTP_404_NOT_FOUND)

            elif action == "REINITIATE":
                try:
                    user = User.objects.get(username=fundtran.user)
                    userwallet = UserWallet.objects.get(user_id=user.id)
                    comuser = User.objects.get(id=upduser)
                except User.DoesNotExist:
                    return Response({'Error': 'Initiating user not found.'}, status=status.HTTP_404_NOT_FOUND)

                if fundtran.transaction_status == TransactionStatus.PENDING:
                    fundtran.lastupdate = timezone.now()
                    fundtran.payment_remark = f"FUNDREQUEST {action} by {comuser.name}"
                    fundtran.transaction_status = TransactionStatus.REINITIATE
                    fundtran.save()
                    walltrans.closing_balance = userwallet.available_balance
                    walltrans.STATUS=fundtran.transaction_status
                    walltrans.save()
                    return Response({'Message': "Reinitiation successful"}, status=status.HTTP_200_OK)
                else:
                    return Response({'Error': 'Re-Initiate not possible.'}, status=status.HTTP_404_NOT_FOUND)
            
            elif action == "FAILURE":
                
                if fundtran.transaction_status == TransactionStatus.FAILURE:
                    return Response({'Error': 'Already Failed.'}, status=status.HTTP_200_OK)
                else:
                    comuser = User.objects.get(id=upduser)
                    fundtran.transaction_status = TransactionStatus.FAILURE
                    fundtran.lastupdate = timezone.now()
                    fundtran.payment_remark = f"FUNDREQUEST {action} by {comuser.name}"
                    fundtran.save()
                    walltrans.closing_balance = userwallet.available_balance
                    walltrans.STATUS=fundtran.transaction_status
                    walltrans.save()
                    return Response({'Message': "Updated successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({'Error': "Not a valid action"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'Error': 'Kindly provide Transaction ID & Action both.'}, status=status.HTTP_400_BAD_REQUEST)

class GetFundRequest(APIView):

    def get(self, request, *args, **kwargs):
        user_id = request.query_params.get('user_id', None)
        is_admin = request.query_params.get('is_admin', 'false').lower() == 'true'

        if is_admin:
            user_transactions = FundRequests.objects.all()
            serializer = FundRequestsSerializer(user_transactions, many=True)
            return Response({'Message': 'Fund requests fetched', 'Data':serializer.data}, status=status.HTTP_200_OK)

        if user_id is not None:
            user_transactions = FundRequests.objects.filter(user_id=user_id)
            serializer = FundRequestsSerializer(user_transactions, many=True)
            return Response({'Message': 'Fund requests fetched', 'Data':serializer.data},  status=status.HTTP_200_OK)

        return Response({'error': 'user_id is required'}, status=status.HTTP_400_BAD_REQUEST)

def zpay_bankadd(payload):
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer ak_live_CYlUjZ3HgAI84thmh0qtK5pUr6Ar6LKQ6FNC:sk_live_2vzdx3JgIqFvQrMGsApgsNcHrmTUOeuwh1OG"
    }
    url = "https://api.zwitch.io/v1/accounts/va_iGTXTqO47awKr9OdhaF0km2Qe/beneficiaries"
    response = requests.post(url, json=payload, headers=headers)
    if response.ok:
        return {
            "status": True,
            "data": response.json()
        }
    else:
        print(response.json())
        return {
            "status": False,
            "message": "Please verify details",
            "data": response.json()
        }

class zpayaddbankbeneficiary(APIView):
    def post(self, request, *args, **kwargs):
        name_of_account_holder = request.data.get("name_of_account_holder")
        email = request.data.get("email")
        phone = request.data.get("phone")
        bank_account_number = request.data.get("bank_account_number")
        bank_ifsc_code = request.data.get("bank_ifsc_code")

        if not (bank_account_number and bank_ifsc_code and name_of_account_holder and email and phone):
            return Response({"Message": "Please fill details"})
        print(bank_ifsc_code)
        payload = {
            "bank_account_number": bank_account_number,
            "bank_ifsc_code": bank_ifsc_code,
            "name_of_account_holder": name_of_account_holder,
            "email": email,
            "phone": phone,
            "type": "account_number"
        }

        response = zpay_bankadd(payload=payload)

        # Log the response for debugging
        print("Response:", response)

        if response.get("status") is True:
            responsebank = response.get("data")

            # Log the response data for debugging
            print("Response Data:", responsebank)

            if isinstance(responsebank, list):
                beneficiaries = responsebank
            elif isinstance(responsebank, dict):
                beneficiaries = [responsebank]
            else:
                return Response({"error": "Invalid response format", "Message": "Beneficiary not fetched"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            for d in beneficiaries:
                # Check if bank account number and IFSC code already exist
                existing_entry = ZpayBankDetail.objects.filter(
                    Q(account_number=d.get('bank_account_number')) &
                    Q(ifsc_code=d.get('bank_ifsc_code'))
                ).first()

                
                if not existing_entry:
                    type_value = ZpayBankDetail.ACCOUNT_NUMBER
                    bank_details = ZpayBankDetail.objects.create(
                        type=type_value,
                        bene_id=d.get('id'),
                        beneficiary_name=d.get('name_of_account_holder'),
                        email=d.get('email'),
                        mobile_number=d.get('phone'),
                        account_number=d.get('bank_account_number'),
                        ifsc_code=d.get('bank_ifsc_code'),
                        bank_name=d.get('bank_name'),
                    )
                if existing_entry:
                    return Response({"Message": "Beneficiary already exists", "Response": response}, status=status.HTTP_200_OK)

            return Response({"Message": "Beneficiary found and added", "Response": response}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Please try again later", "Message": "Beneficiary not fetched"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
        result = zpaygetallbeneficiary()
        if result["status"]:
            responsebank = result["data"]
            for d in responsebank:
                    if d['type'] == 'account_number': 
                        type_value = ZpayBankDetail.ACCOUNT_NUMBER 
                        bank_details, _ = ZpayBankDetail.objects.get_or_create(
                        type = type_value,
                        bene_id=d['id'],
                        beneficiary_name=d['name_of_account_holder'],
                        email = d['email'],
                        mobile_number = d['phone'],
                        account_number = d['bank_account_number'],
                        ifsc_code=d['bank_ifsc_code'],
                        bank_name=d['bank_name'],
                    )
                    else:
                        type_value = ZpayBankDetail.VPA 
                        bank_details, _ = ZpayBankDetail.objects.get_or_create(
                            type = type_value,
                            bene_id=d['id'],
                            beneficiary_name=d['name_of_account_holder'],
                            email = d['email'],
                            mobile_number = d['phone'],
                            upi = d['vpa'],
                    )
            return Response({"Response": result["data"], "Message":"Customers created"}, status=200)
        else:
            return Response({"Error": result["data"], "Message":"Unable to create Customers" }, status=400)

class ZPayGetBeneficiaryById(APIView):
    def get(self, request, *args, **kwargs):
        # Get the beneficiary ID from query parameters
        beneficiary_id = request.query_params.get('beneid')
        
        if not beneficiary_id:
            return Response({"Error": "Beneficiary ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Call the function to get beneficiary details by ID
        response = zpaybeneficiarybyid(beneficiary_id)
         
        if response.get("status"):
            return Response({"Message": "Beneficiary Found", "Response": response["data"]}, status=status.HTTP_200_OK)
        else:
            return Response({"Message": "Unable to get beneficiary details", "Error": response["data"]}, status=status.HTTP_404_NOT_FOUND)
        
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
        beneficiary_id = request.data.get("beneficiary_id")
        amount = request.data.get("amount")
        mobileno =  request.data.get("mobile")
        bene_name =  request.data.get("bene_name")
        merchant_reference_id = request.data.get("merchant_reference_id")
        payment_remark = request.data.get("payment_remark")
        payment_mode = request.data.get("payment_mode")
        bank_acc_number = request.data.get("bank_acc_number")
        user_id = request.data.get("user_id")
        tpin = request.data.get("tpin")
                
        if not (beneficiary_id and amount and merchant_reference_id and payment_mode and bank_acc_number and user_id and tpin):
            return Response({"error": "Please fill details"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "Invalid user ID"}, status=status.HTTP_400_BAD_REQUEST)
        print(tpin, user.tpin)
        if str(user.tpin) != str(tpin):
            return Response({"error": "Invalid tpin"}, status=status.HTTP_400_BAD_REQUEST)
        
        surchargeobj = Surcharge.objects.get(user=user)
        
        wallet_obj = user.userwallet
        opening_balance = wallet_obj.available_balance

        if 100<= amount <= 1000:
            surp = surchargeobj.payoutflat_s101to2000
            surcharge =  surchargeobj.payoutflat_s101to2000
        elif 1001<= amount <= 5000:
            surp = surchargeobj.payoutperc_s2001to5000
            surcharge = (amount * surchargeobj.payoutperc_s2001to5000)
        elif 5001<= amount <= 10000:
            surp = surchargeobj.payoutperc_s5001to10000
            surcharge = (amount * surchargeobj.payoutperc_s5001to10000)
        elif 10001<= amount <= 50000:
            surp = surchargeobj.payoutperc_s10001to50000
            surcharge = (amount * surchargeobj.payoutperc_s10001to50000)
        elif 50001<= amount <= 100000:
            surp = surchargeobj.payoutperc_s50001to100000
            surcharge = (amount * surchargeobj.payoutperc_s50001to100000)
        elif 100001<= amount <= 500000:
            surp = surchargeobj.payoutperc_s100001to500000
            surcharge = (amount * surchargeobj.payoutperc_s100001to500000)
        elif 500000<= amount:
            surp = surchargeobj.payoutperc_s500001toall
            surcharge = (amount * surchargeobj.payoutperc_s500001toall)
    
        if surcharge:

            print(surcharge)
            if (amount + surcharge) > wallet_obj.available_balance:
                return Response({"error": "Insufficient Balance"}, status=status.HTTP_400_BAD_REQUEST)
            
            wallet_obj.available_balance -= (amount + surcharge)
            wallet_obj.save()
            
            tr_obj = DMTTransactions.objects.create(
                bank_acc_number=bank_acc_number,
                ref_id=merchant_reference_id, 
                user=user,  
                bene_id=beneficiary_id, 
                transaction_status=TransactionStatus.PENDING,
                amount=amount,
                charge=surcharge,
                bene_name=bene_name,
                mobile=mobileno,
                transaction_type=TransactionType.IMPS if payment_mode == "IMPS" else TransactionType.NEFT,
                payment_remark=payment_remark,
                created_at=timezone.now()
            )

            wallobj = WalletTransactions.objects.create(
                user=user,
                transaction_direction=TransactionDirection.DEBIT,
                add_date=timezone.now(),
                ref_id=merchant_reference_id,
                transaction_status=TransactionStatus.PENDING,
                amount=amount,
                transaction_type=CompTransactionType.DMT,
                charge=surcharge,
                remark=f"Money Transfer: A/c#{bank_acc_number} , Mob#{mobileno}",
                opening_balance=opening_balance,
                closing_balance=wallet_obj.available_balance 
            )

            payload = {
                "type": "account_number",
                "debit_account_id": "va_iGTXTqO47awKr9OdhaF0km2Qe",
                "beneficiary_id": beneficiary_id,
                "amount": amount,
                "currency_code": "inr",
                "payment_mode": payment_mode,
                "merchant_reference_id": merchant_reference_id,
                "payment_remark": payment_remark,
            }
        
            # Simulate zpay_transfer response
            response = True  # Replace this with the actual API call response

            if response:
                wallobj.transaction_status = TransactionStatus.SUCCESS
                wallobj.save()
                print(wallobj.closing_balance)
                tr_obj.transaction_status = TransactionStatus.SUCCESS
                tr_obj.save()  
                
                if(surp>0.03):
                    self.update_wallets_on_success(user, surcharge, mobileno, merchant_reference_id, wallobj, bank_acc_number)
                
                transaction_data = DmttransactionSerializer(tr_obj).data
                return Response({"message": "Funds transferred successfully", "transaction": transaction_data}, status=status.HTTP_201_CREATED)
            else:
                wallobj.transaction_status = TransactionStatus.PENDING
                wallobj.save()
                tr_obj.transaction_status = TransactionStatus.PENDING
                tr_obj.save()
                
                comp_user = User.objects.get(id=6)
                cref_id = ''.join([str(random.randint(0, 9)) for _ in range(12)])
                main_wallet = UserWallet.objects.get(user_id=6)
                copenbalance = main_wallet.available_balance
                main_wallet.available_balance += (amount + surcharge)
                main_wallet.save()

                WalletTransactions.objects.create(
                    user=comp_user,
                    ref_id=cref_id,
                    transaction_direction=TransactionDirection.CREDIT,
                    add_date=timezone.now(),
                    transaction_status=TransactionStatus.SUCCESS,
                    amount=amount ,
                    transaction_type=CompTransactionType.DMT,
                    opening_balance=copenbalance,
                    closing_balance=main_wallet.available_balance,
                    remark=f"Money Transfer: A/c#{bank_acc_number} , Mob#{mobileno}",

                )

                transaction_data = DmttransactionSerializer(tr_obj).data
                return Response({"message": "Transaction id Pending", "transaction": transaction_data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "No Surcharge",},  status=status.HTTP_400_BAD_REQUEST)


    def update_wallets_on_success(self, user, surcharge, mobileno, merchant_reference_id, wallobj, bank_acc_number):
        dicashback = user.diback
        retcashback = user.retback
        wallet_obj = user.userwallet
        
        wallet_obj.refresh_from_db()
        rref_id = ''.join([str(random.randint(0, 9)) for _ in range(12)])
        ropening_balance = wallet_obj.available_balance
        cashback_amount = (surcharge * retcashback -  (surcharge * retcashback) * 0.05)
        wallet_obj.available_balance += cashback_amount

        wallobj.tds = (surcharge * retcashback) * 0.05
        wallobj.comission = cashback_amount
        wallobj.save()
        
        # User wallet
        if user.parent_id:
            parent_userid = User.objects.get(id=user.parent_id)
            parent_wallet = UserWallet.objects.get(user_id=user.parent_id)
            popenbalance = parent_wallet.available_balance
            parent_cashback = surcharge * dicashback - (surcharge * dicashback) * 0.05
            parent_wallet.available_balance += parent_cashback
            parent_wallet.save()
            pref_id = ''.join([str(random.randint(0, 9)) for _ in range(12)])

            WalletTransactions.objects.create(
                user=parent_userid,
                transaction_direction=TransactionDirection.CREDIT,
                ref_id=rref_id,
                add_date=timezone.now(),
                transaction_status=TransactionStatus.SUCCESS,
                amount=parent_cashback,
                transaction_type=CompTransactionType.DMT,
                opening_balance=popenbalance,
                closing_balance=parent_wallet.available_balance,
                charge=0,
                tds=(surcharge * dicashback) * 0.05,
                comission=parent_cashback,
                remark=f"Money Transfer: A/c#{bank_acc_number} , Mob#{mobileno}",
            )

            # Company Wallet
            main_wallet = UserWallet.objects.get(user_id=6)
            comp_user = User.objects.get(id=6)
            # cref_id = ''.join([str(random.randint(0, 9)) for _ in range(12)])

            copenbalance = main_wallet.available_balance
            company_cashback = surcharge - (cashback_amount + parent_cashback)
            main_wallet.available_balance += company_cashback
            main_wallet.save()

            WalletTransactions.objects.create(
                user=comp_user,
                transaction_direction=TransactionDirection.CREDIT,
                ref_id=rref_id,
                add_date=timezone.now(),
                transaction_status=TransactionStatus.SUCCESS,
                amount=company_cashback,
                transaction_type=CompTransactionType.WALLET,
                opening_balance=copenbalance,
                closing_balance=main_wallet.available_balance,
                remark=f"Money Transfer: A/c#{bank_acc_number} , Mob#{mobileno}",
            )
        else:
            # Company Wallet
            main_wallet = UserWallet.objects.get(user_id=6)
            comp_user = User.objects.get(id=6)
            cref_id = ''.join([str(random.randint(0, 9)) for _ in range(12)])

            copenbalance = main_wallet.available_balance
            company_cashback = (surcharge -  (surcharge * retcashback) * 0.05)
            main_wallet.available_balance += company_cashback
            main_wallet.save()

            WalletTransactions.objects.create(
                user=comp_user,
                transaction_direction=TransactionDirection.CREDIT,
                ref_id=rref_id,
                add_date=timezone.now(),
                transaction_status=TransactionStatus.SUCCESS,
                amount=company_cashback,
                transaction_type=CompTransactionType.WALLET,
                opening_balance=copenbalance,
                closing_balance=main_wallet.available_balance,
                remark=f"Money Transfer: A/c#{bank_acc_number} , Mob#{mobileno}",
            )
     
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

class GetDmtTransactions(APIView):
    def get(self, request, id=None):
        if id is not None:
            try:
                transactions = DMTTransactions.objects.filter(user=id)  # Filter transactions by user ID
                if transactions.exists():
                    serializer = DmttransactionSerializer(transactions, many=True)
                    return Response({'Data':serializer.data}, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "Transactions not found"}, status=status.HTTP_404_NOT_FOUND)
            except DMTTransactions.DoesNotExist:
                return Response({"message": "Transactions not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            transactions = DMTTransactions.objects.all()
            serializer = DmttransactionSerializer(transactions, many=True)
            return Response({'Data':serializer.data}, status=status.HTTP_200_OK)
        
class GetWalletTransactions(APIView):
    def get(self, request, id=None):
        
        if id is not None:
            try:
                transactions = WalletTransactions.objects.filter(user=id)  # Filter transactions by user ID
                if transactions.exists():
                    serializer = WalletTransactionSerializer(transactions, many=True)
                    return Response({'data':serializer.data}, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "Transactions not found"}, status=status.HTTP_404_NOT_FOUND)
            except WalletTransactions.DoesNotExist:
                print('ID',id)
                return Response({"message": "Transactions not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            transactions = WalletTransactions.objects.all()
            serializer = WalletTransactionSerializer(transactions, many=True)
            return Response({'data':serializer.data}, status=status.HTTP_200_OK)

class GetBBPSTransactions(APIView):
    def get(self, request, id=None):
        
        if id is not None:
            try:
                transactions = BBPSTransactions.objects.filter(user=id)  # Filter transactions by user ID
                if transactions.exists():
                    serializer = BBPSTransactionSerializer(transactions, many=True)
                    return Response({'data':serializer.data}, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "Transactions not found"}, status=status.HTTP_404_NOT_FOUND)
            except BBPSTransactions.DoesNotExist:
                print('ID',id)
                return Response({"message": "Transactions not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            transactions = WalletTransactions.objects.all()
            serializer = WalletTransactionSerializer(transactions, many=True)
            return Response({'data':serializer.data}, status=status.HTTP_200_OK)
           
class Wallettowallet(APIView):

    def post(self, request, *args, **kwargs):

        username =  request.data.get("username")
        mobile = request.data.get("mobile")
        amount = request.data.get("amount")
        tpin = request.data.get("tpin")

        if not username and not amount and not mobile and not tpin:
            return Response({"error": "Please provide required fields"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(username=username)
            if user:
                bene_user = User.objects.get(mobile=mobile)
            else:
                return Response({"error": "User Not found"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "Mobile no not found"}, status=status.HTTP_400_BAD_REQUEST)
        
        if str(user.tpin) != str(tpin):
            return Response({"error": "Invalid tpin"}, status=status.HTTP_400_BAD_REQUEST)
        
        if bene_user:
            print("both found")
            user_wallet = user.userwallet
            bene_user_wallet = bene_user.userwallet
            
            if user_wallet and bene_user_wallet:
                if not (amount)<user.available_balance:
                    return Response({"error": "Insufficient Balance"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    ref_id = ''.join([str(random.randint(0, 9)) for _ in range(12)])
                    openingbalance = user_wallet.available_balance
                    print(user_wallet.available_balance)
                    user_wallet.available_balance = user_wallet.available_balance - amount
                    user_wallet.save()
                    
                    WalletTransactions.objects.create(
                        transaction_direction=TransactionDirection.DEBIT,
                        user=user,
                        ref_id=ref_id,
                        transaction_status=TransactionStatus.SUCCESS,
                        amount=amount,
                        add_date=timezone.now(),
                        transaction_type=CompTransactionType.WALLET,
                        opening_balance=openingbalance,
                        closing_balance=user_wallet.available_balance
                    )
                    Wallet_to_Wallet_transaction.objects.create(
                        transaction_direction = TransactionDirection.DEBIT,
                        ref_id= ref_id,
                        user = user,
                        mobile = mobile,
                        sender = user.username,
                        receiver = bene_user.username,
                        receivername = bene_user.name,
                        transaction_status = TransactionStatus.SUCCESS,
                        amount = amount,
                        transaction_type = CompTransactionType.WALLET,
                        add_date = timezone.now()
                    )
                    beneopeningbalance = bene_user_wallet.available_balance
                    bene_user_wallet.available_balance = bene_user_wallet.available_balance + amount
                    bene_user_wallet.save()

                    WalletTransactions.objects.create(
                        transaction_direction=TransactionDirection.CREDIT,
                        user=bene_user,
                        ref_id=ref_id,
                        transaction_status=TransactionStatus.SUCCESS,
                        amount=amount,
                        add_date=timezone.now(),
                        transaction_type=CompTransactionType.WALLET,
                        opening_balance=beneopeningbalance,
                        closing_balance=bene_user_wallet.available_balance
                    )
                    Wallet_to_Wallet_transaction.objects.create(
                        transaction_direction = TransactionDirection.CREDIT,
                        ref_id= ref_id,
                        user = bene_user,
                        mobile = mobile,
                        receiver = bene_user.username,
                        receivername = bene_user.name,
                        sender = user.username,
                        transaction_status = TransactionStatus.SUCCESS,
                        amount = amount,
                        transaction_type = CompTransactionType.WALLET,
                        add_date = timezone.now()
                    )
                    return Response({"Message": "Wallet Traansferred Successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Userwallet & Beneficiary Userwallet not found."}, status=status.HTTP_400_BAD_REQUEST)

                
class GetWallettoWalletTransactions(APIView):
    def get(self, request, id=None):
        if id is not None:
            try:
                transactions = Wallet_to_Wallet_transaction.objects.filter(user=id)  # Filter transactions by user ID
                if transactions.exists():
                    serializer = WallettoWalletTransactionSerializer(transactions, many=True)  # Correctly instantiate the serializer
                    return Response({'Data': serializer.data}, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "Transactions not found"}, status=status.HTTP_404_NOT_FOUND)
            except Wallet_to_Wallet_transaction.DoesNotExist:
                return Response({"message": "Transactions not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            transactions = Wallet_to_Wallet_transaction.objects.all()
            serializer = WallettoWalletTransactionSerializer(transactions, many=True)  # Correctly instantiate the serializer
            return Response({'Data': serializer.data}, status=status.HTTP_200_OK)
            

