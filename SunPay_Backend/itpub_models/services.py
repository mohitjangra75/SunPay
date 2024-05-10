from datetime import datetime
import uuid
import jwt
import json
import requests
import random
import csv
from .models import BBPSProviders, State, BillType
import ssl
from requests.adapters import HTTPAdapter

PARTNERID = "UFR008081"  # Replace with your actual PARTNERID

def generate_jwt_request():
    timestamp = int(datetime.now().strftime("%Y%m%d%H%M%S%f"))
    reqid = str(uuid.uuid4()).replace("-", "0")
    return {"timestamp": timestamp, "partnerId": PARTNERID, "reqid": reqid}

def get_token():
    jwt_request = generate_jwt_request()
    token = jwt.encode(jwt_request, "MmVmNDQ1ZmNmM2QyMGUyOTA2Y2U0YWFlNTE3ODAxYTE=", algorithm="HS256")
    return token

# def add_beneficary(payload):
#     token = get_token()
#     headers = {
#         "Token":token,
#         "Authorisedkey":"NjJiNDhmMTI3NWMyNDVhYzZiYTVkNmIyNWQyMzNiZDQ=",
#         "Accept": "application/json",
#         "Content-Type": "application/json"
#     }
#     url = "https://api.paysprint.in/api/v1/service/dmt/beneficiary/registerbeneficiary"
#     response = requests.post(url=url,json=payload, headers=headers)
#     if response.ok:
#         return {"status":True,
#         "data":response.json()}
#     else:
#         return {"status":False,
#         "data":"Please verify details"}
def fetch_paysprintbeneficiary(payload):
    token = get_token()
    AuthKey = "NjJiNDhmMTI3NWMyNDVhYzZiYTVkNmIyNWQyMzNiZDQ="
    url = "https://sit.paysprint.in/service-api/api/v1/service/dmt/beneficiary/registerbeneficiary/fetchbeneficiary"
    headers = {
        "Token": token,
        "Content-Type": "application/json",
        "accept": "application/json"
    }
    response = requests.post(url=url,json=payload, headers=headers)
    if response.ok:
        return {
            "status": True,
            "data": response.json()
        }
    else:
        return {
            "status": False,
            "data": "Please verify details",
            "response" : response.json()
        }

def add_beneficiary(api_token, mobile_number, bene_name, number, bank_account, bank_name, ifsc, user_id, partnerSubId):
    url = "https://api.levinfintech.com/api/levin/add-beneficiary"
    payload = {
        "api_token": api_token,
        "mobile_number": mobile_number,
        "bene_name": bene_name,
        "number": number,
        "bank_account": bank_account,
        "bank_name": bank_name,
        "ifsc": ifsc,
        "user_id": user_id,
        "partnerSubId": partnerSubId
    }
    headers = {
        "Content-Type": "application/json"
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.ok:
        data = response.json()
        return {
            "status_id": data.get("status_id"),
            "message": data.get("message"),
            "bene_id": data.get("bene_id"),
            "data": data.get("data")
        }
    else:
        return {"status_id": None, "message": "Failed to add beneficiary", "bene_id": None, "data": None}

def del_beneficiary(payload):
    token = get_token()
    headers = {
        "Token":token,
        "Authorisedkey":"NjJiNDhmMTI3NWMyNDVhYzZiYTVkNmIyNWQyMzNiZDQ=",
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    url = "https://api.paysprint.in/api/v1/service/dmt/beneficiary/registerbeneficiary/deletebeneficiary"
    response = requests.post(url=url,json=payload, headers=headers)
    if response.ok:
        return {"status":True,
        "data":response.json()}
    else:
        return {"status":False,
        "data":"Please verify details"} 

def fund_transfer(payload):
    token = get_token()
    headers = {
        "Token":token,
        "Authorisedkey":"NjJiNDhmMTI3NWMyNDVhYzZiYTVkNmIyNWQyMzNiZDQ=",
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    url = "https://api.paysprint.in/api/v1/service/dmt/transact/transact"
    response = requests.post(url=url,json=payload, headers=headers)
    if response.ok:
        return {"status":True,
        "data":response.json()}
    else:
        return {"status":False,
        "data":"Please verify details"}

def query_remitter(payload):
    token = get_token()
    AuthKey = "NjJiNDhmMTI3NWMyNDVhYzZiYTVkNmIyNWQyMzNiZDQ="
    url = "https://sit.paysprint.in/service-api/api/v1/service/dmt/remitter/queryremitter"
    headers = {
        "Token": token,
        "Authorisedkey": AuthKey,
        "Content-Type": "application/json",
        "accept": "application/json"
    }
    print("URL:", url, "Headers:", headers)
    response = requests.post(url=url, json=payload, headers=headers)
    print(response.text)
    if response.ok:
        return {
            "status": True,
            "data": response.json()
        }
    else:
        return {
            "status": False,
            "data": "Please verify details",
            "resp" : response.json()
        }



def register_remitter(payload):
    token = get_token()
    headers = {
        "Token":token,
        "Authorisedkey":"NjJiNDhmMTI3NWMyNDVhYzZiYTVkNmIyNWQyMzNiZDQ=",
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    url = "https://api.paysprint.in/api/v1/service/dmt/remitter/registerremitter"
    response = requests.post(url=url,json=payload, headers=headers)
    if response.ok:
        return {"status":True,
        "data":response.json()}
    else:
        return {"status":False,
        "data":"Please verify details"} 

def pay_recharge(payload):
    headers = {
        # "Token":token,
        # "Authorisedkey":"NjJiNDhmMTI3NWMyNDVhYzZiYTVkNmIyNWQyMzNiZDQ=",
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    url = "https://api.levinfintech.com/api/levin/recharge/recharge-now"
    response = requests.post(url=url,json=payload, headers=headers)
    if response.ok:
        return {"status":True,
        "data":response.json()}
    else:
        return {"status":False,
        "data":"Please verify details"}


def get_bill_details(payload):
    headers = {
        # "Token":token,
        # "Authorisedkey":"NjJiNDhmMTI3NWMyNDVhYzZiYTVkNmIyNWQyMzNiZDQ=",
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    url = "https://api.levinfintech.com/api/levin/bbps/get-biller-details"
    response = requests.post(url=url,json=payload, headers=headers)
    if response.ok:
        return {"status":True,
        "data":response.json()}
    else:
        print(response.json())
        return {"status":False,
        "data":"Please verify details"} 

def ansh_payout(payload):
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    url = "https://api.anshpe.in/api/v1/panel/PayoutRequest"
    response = requests.post(url=url,json=payload, headers=headers)
    if response.ok:
        return {"status":True,
        "data":response.json()}
    else:
        print(response.json())
        return {"status":False,
        "data":"Please verify details"} 
    
def zpay_verification(payload):
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization" : "Bearer ak_live_CYlUjZ3HgAI84thmh0qtK5pUr6Ar6LKQ6FNC:sk_live_2vzdx3JgIqFvQrMGsApgsNcHrmTUOeuwh1OG"
    }
    url = "https://api.zwitch.io/v1/verifications/bank-account"
    response = requests.post(url, json=payload, headers=headers)
    if response.ok:
        return {"status":True,
        "data":response.json()}
    else:
        print(response.json())
        return {"status":False,
        "data":"Please verify details"} 

def zpay_transfer(payload):
    
    payload = {
        "type": "account_number",
        "currency_code": "inr",
        "async": False
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization" : "Bearer ak_live_CYlUjZ3HgAI84thmh0qtK5pUr6Ar6LKQ6FNC:sk_live_2vzdx3JgIqFvQrMGsApgsNcHrmTUOeuwh1OG"

    }
    
    url = "https://api.zwitch.io/v1/transfers"

    response = requests.post(url, json=payload, headers=headers)
    print(response.text)

    if response.ok:
        return {"status":True,
        "data":response.json()}
    else:
        return {"status":False,
        "data":"Please verify details"} 
    
def zpay_bankadd(payload):
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization" : "Bearer ak_live_CYlUjZ3HgAI84thmh0qtK5pUr6Ar6LKQ6FNC:sk_live_2vzdx3JgIqFvQrMGsApgsNcHrmTUOeuwh1OG"
    }
    url = "https://api.zwitch.io/v1/accounts/va_iGTXTqO47awKr9OdhaF0km2Qe/beneficiaries"
    response = requests.post(url, json=payload, headers=headers)
    if response.ok:
        return {"status":True,
        "data":response.json()}
    else:
        print(response.json())
        return {"status":False,
        "message":"Please verify details",
        "data":response.json()}

def zpay_upiadd(payload):
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization" : "Bearer ak_live_CYlUjZ3HgAI84thmh0qtK5pUr6Ar6LKQ6FNC:sk_live_2vzdx3JgIqFvQrMGsApgsNcHrmTUOeuwh1OG"
    }
    url = "https://api.zwitch.io/v1/accounts/va_iGTXTqO47awKr9OdhaF0km2Qe/beneficiaries"
    response = requests.post(url, json=payload, headers=headers)
    if response.ok:
        return {"status":True,
        "data":response.json()}
    else:
        print(response.json())
        return {"status":False,
        "message":"Please verify details",
        "data":response.json()}    

def zpay_transfer(payload):
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization" : "Bearer ak_live_CYlUjZ3HgAI84thmh0qtK5pUr6Ar6LKQ6FNC:sk_live_2vzdx3JgIqFvQrMGsApgsNcHrmTUOeuwh1OG"
    }
    url = "https://api.zwitch.io/v1/transfers"
    response = requests.post(url, json=payload, headers=headers)
    if response.ok:
        return {"status":True,
        "data":response.json()}
    else:
        print(response.json())
        return {"status":False,
        "message":"Please verify details",
        "data":response.json()}

def zpaygetallbeneficiary():
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization" : "Bearer ak_live_CYlUjZ3HgAI84thmh0qtK5pUr6Ar6LKQ6FNC:sk_live_2vzdx3JgIqFvQrMGsApgsNcHrmTUOeuwh1OG"
        }
    
    url = "https://api.zwitch.io/v1/accounts/va_iGTXTqO47awKr9OdhaF0km2Qe/beneficiaries?results_per_page=100"

    response = requests.get(url, headers=headers)
    if response.ok:
        return {"status":True,
        "data":response.json()}
    else:
        print(response.json())
        return {"status":False,
        "data":"Please verify details"}

def zpaybeneficiarybyid(param1):
   
    headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : "Bearer ak_live_CYlUjZ3HgAI84thmh0qtK5pUr6Ar6LKQ6FNC:sk_live_2vzdx3JgIqFvQrMGsApgsNcHrmTUOeuwh1OG"
            }
    url = "https://api.zwitch.io/v1/accounts/beneficiaries/{param1}"

    response = requests.get(url, headers=headers)
    if response.ok:
        return {"status":True, "data":response.json()
        }
    else:
        print(response.json())
        return ({"status":False,
        "data":"Please verify details"})

def generate_otp(length=4):
    digits = "0123456789"
    otp = ''.join(random.choice(digits) for _ in range(length))
    return otp
    
def send_otp(mobile_number):
    otp = generate_otp()
    url = "http://sms.anshpe.in/rest/services/sendSMS/sendGroupSms"
    payload = {
        "smsContent": f"Your OTP is: {otp}",
        "groupId": "0",
        "routeId": "1",
        "mobileNumbers": mobile_number,
        "senderId": "DEMOOS",
        "signature": "signature",
        "smsContentType": "ENGLISH",
        "entityid": "NoneedIfAddedInPanel",
        "tmid": "140200000022",
        "templateid": "NoneedIfAddedInPanel"
    }
    querystring = {"AUTH_KEY": 'c5ea69e56dcb107bb3ed988af8c5c3e5'}
    headers = {
        'Content-Type': "application/json",
        'Cache-Control': "no-cache"
    }
    response = requests.post(url, json=payload, headers=headers, params=querystring)
    print("Payload:", payload)
    print("Response:", response)
    print("Response JSON:", response.json())
    return otp

def data_load_bbps_providers(file_path):
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            provider_id = row['provider_id']
            provider_name = row['name']
            type_value = row['type']
            fields_description = row['Fields Description']
            type_value = getattr(BillType, type_value)
            bbps_provider = BBPSProviders.objects.create(
                provider_id=provider_id,
                provider_name=provider_name,
                type=type_value,
                Fields_Description=fields_description
            )
            bbps_provider.save()

def data_load_state(file_path):
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            state_id = row['statecode']
            state_name = row['name']
            state_code = row['statecode']
            country_id = row['country_id']
            is_active = row['is_active']
            created_date = datetime.strptime(row['created_date'], '%d-%m-%Y %H:%M')
            update_date = None if row['update_date'] == 'NULL' else datetime.strptime(row['update_date'], '%d-%m-%Y %H:%M')
            state = State.objects.create(
                state_id=state_id,
                state_name=state_name,
                state_code=state_code,
                country_id=country_id,
                is_active=is_active,
                created_date=created_date,
                update_date=update_date
            )
            state.save()
