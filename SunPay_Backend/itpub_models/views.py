
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import UserSerializer, BeneficiarySerializer,BBPSFieldsSerializer
from .services import add_beneficary, del_beneficiary, query_remitter , register_remitter, fund_transfer, get_bill_details, pay_recharge, ansh_payout
from .models import User, BankDetails, DMTTransactions, TransactionStatus, TransactionType, UserTransactions, BBPSModelFields, BBPSTransactions
import uuid

class LoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        login_id = request.data.get('login_id')
        password = request.data.get('password')

        if login_id and password:
            user = authenticate(request, username=login_id, password=password)
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

        if password and username:
            user = authenticate(request, username=username, password=password)
            if user:
                if user.is_tpin_enabled and tpin == user.tpin:
                    return Response({"message": "Login Succesfull","data":UserSerializer(user,many=False).data}, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "Invalid TPIN",}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid login credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"error": "login_id and password are required fields"}, status=status.HTTP_400_BAD_REQUEST)

class AddBenAccount(APIView):

    def post(self, request, *args, **kwargs):
        beneficiary_name = request.data.get("beneficiary_name")
        bank_id = request.data.get("bank_id")
        account_number = request.data.get("account_number")
        ifsc_code = request.data.get("ifsc_code")
        mobile_number = request.data.get("mobile_number")

        if not beneficiary_name and not bank_id and not account_number and not ifsc_code and not mobile_number:
            return Response({"error": "Please provide required fields"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user=User.objects.get(mobile_number=mobile_number)
        except:
            return Response({"error": "Invalid mobile number"}, status=status.HTTP_400_BAD_REQUEST)
    
        payload = {
            "mobile": mobile_number,
            "benename": beneficiary_name,
            "bankid": bank_id,
            "accno": account_number,
            "ifsccode": ifsc_code,
            "verified": "1",
            "gst_state": "17",
            "dob": user.dob,
            "address": user.address,
            "pincode": user.pin_code
        }

        response = add_beneficary(payload)

        if response["status"]==True:
            bank_obj = BankDetails.objects.create(
                beneficiary_name = beneficiary_name,
                bank_name = response["data"]["bankname"],
                account_number = account_number,
                ifsc_code= ifsc_code,
                mobile_number=mobile_number,
                registered_with=user,
                bene_id = response["data"]["bene_id"],

            )
            return Response({"message": "Details uploaded successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Invalid Details"}, status=status.HTTP_400_BAD_REQUEST)

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
            user=User.objects.get(mobile_number=mobile_number)
        except:
            return Response({"error": "Invalid Details"}, status=status.HTTP_400_BAD_REQUEST)
        
        payload = {"mobile": mobile_number,"bank3_flag": "NO"}
        response = query_remitter(payload=payload)
        if response["status"]==True:
            data = BeneficiarySerializer(user.bankdetails_set.filter(is_active=True), many=True)
            return Response({"data":data, "query_rem_value":response["data"]})
        else:
            return Response({"error": "Please register first to send money"}, status=status.HTTP_400_BAD_REQUEST)


class RegisterRemitter(APIView):
    def post(self, request, *args, **kwargs):
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        adress = request.data.get("adress")
        pin_code = request.data.get("pin_code")
        otp = request.data.get("otp")
        stateresp = request.data.get("stateresp")
        mobile_number = request.data.get("mobile_number")
        if not mobile_number:
            return Response({"error": "Please add mobile_number in query params"}, status=status.HTTP_400_BAD_REQUEST)
        
        payload = {
            "mobile": mobile_number,
            "firstname": first_name,
            "lastname": last_name,
            "address": adress,
            "otp": otp,
            "pincode": pin_code,
            "dob" : "1995-01-01",
            "gst_state" : "17",
            "bank3_flag" : "no",
            "stateresp":stateresp}
        response = register_remitter(payload=payload)
        if response["status"]==True:
            return Response({"data":response["data"],})
        else:
            return Response({"error": "Please register first to send money"}, status=status.HTTP_400_BAD_REQUEST)
        
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

        if not amount and not bene_id and not txntype and not referenceid and not mobile and not mpin:
            return Response({"error": "Please provide required fields"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user=User.objects.get(mobile_number=mobile)
        except:
            return Response({"error": "Invalid mobile number"}, status=status.HTTP_400_BAD_REQUEST)
        wallet_obj = user.userwallet_set.first()
        if not (amount+surcharge)<wallet_obj.available_balance:
            return Response({"error": "Insufficient Balance"}, status=status.HTTP_400_BAD_REQUEST)

        if not user.mpin == mpin:
            return Response({"error": "Invalid mpin"}, status=status.HTTP_400_BAD_REQUEST)
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
             "amount":amount + surcharge }

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
            return Response({"message": "Funds transferred successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Invalid Details"}, status=status.HTTP_400_BAD_REQUEST)

    
class FundRequest(APIView):
    def post(self, request, *args, **kwargs):
        amount = request.data.get("amount")
        bank_acc_number = request.data.get("bank_acc_number")
        ref_number = request.data.get("ref_number")
        payment_mode = request.data.get("payment_mode")
        payment_date = request.data.get("payment_date")
        remark = request.data.get("remark")
        mobile_number = request.data.get("mobile_number")

        if not (bank_acc_number and amount and ref_number and payment_mode and payment_date and remark and mobile_number ):
            return Response({"error": "Invalid Details"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.get(mobile_number = mobile_number)
        wallet_obj = user.userwallet_set.first()
        tr_obj = UserTransactions.objects.create(
            user=user,
            bank_ref_number = ref_number,
            bank_acc_number = bank_acc_number,
            remark =remark,
            payment_date = payment_date,
            transaction_status = TransactionStatus.PENDING,
            payment_mode = payment_mode,
            amount = amount,
            opening_balance = wallet_obj.available_balance
        )
        return Response({"message": "Succesfully initiated fund request"},)

class GetBBPSTypes(APIView):

    def get(self, request, *args, **kwargs):
        bill_type = request.query_params.get("bill_type")
        if bill_type:
            querset = BBPSModelFields.objects.filter(bill_type = bill_type)
            data = BBPSFieldsSerializer(querset, many=True).data
            return Response(data)
        else:
            querset = BBPSModelFields.objects.all()
            data = BBPSFieldsSerializer(querset, many=True).data
            return Response(data)

class PayRecharge(APIView):
    def post(self, request, *args, **kwargs):
        number = request.data.get("number")
        provider_id = request.data.get("provider_id")
        amount = request.data.get("amount")
        client_id = request.data.get("client_id")

        if not (number and provider_id and client_id and amount):
            return Response({"error":"Please fill number client_id and provider_id"})

        payload = {
            'number' :number,
            'provider_id' : provider_id,
            'amount' : amount,
            'client_id' : client_id,
            'user_id' : "2",
            'api_token' :"1vuiyiyiniitnadhsalha$(%23$%(%26@)$@usow89342mdfu",
            'provider_code' :"NA"
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

        if not (number and provider_id and client_id):
            return Response({"error":"Please fill number client_id and provider_id"})

        payload = {
            'api_token' :"1vuiyiyiniitnadhsalha$(%23$%(%26@)$@usow89342mdfu",
            'number' :number,
            'provider_id' : provider_id,
            'user_id' : "2",
            'client_id' : client_id,
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


