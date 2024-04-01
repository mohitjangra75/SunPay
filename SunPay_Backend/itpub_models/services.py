from datetime import datetime
import uuid
import jwt
import json
import requests
import random

PARTNERID = "UFR008081"  # Replace with your actual PARTNERID

def generate_jwt_request():
    timestamp = int(datetime.now().strftime("%Y%m%d%H%M%S%f"))
    reqid = str(uuid.uuid4()).replace("-", "0")
    return {"timestamp": timestamp, "partnerId": PARTNERID, "reqid": reqid}

def get_token():
    jwt_request = generate_jwt_request()
    token = jwt.encode(jwt_request, "MmVmNDQ1ZmNmM2QyMGUyOTA2Y2U0YWFlNTE3ODAxYTE=", algorithm="HS256")
    return token

def add_beneficary(payload):
    token = get_token()
    headers = {
        "Token":token,
        "Authorisedkey":"NjJiNDhmMTI3NWMyNDVhYzZiYTVkNmIyNWQyMzNiZDQ=",
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    url = "https://api.paysprint.in/api/v1/service/dmt/beneficiary/registerbeneficiary"
    response = requests.post(url=url,json=payload, headers=headers)
    if response.ok:
        return {"status":True,
        "data":response.json()}
    else:
        return {"status":False,
        "data":"Please verify details"}

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
    headers = {
        "Token":token,
        "Authorisedkey":"NjJiNDhmMTI3NWMyNDVhYzZiYTVkNmIyNWQyMzNiZDQ=",
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    url = "https://api.paysprint.in/api/v1/service/dmt/remitter/queryremitter"
    response = requests.post(url=url,json=payload, headers=headers)
    if response.ok:
        return {"status":True,
        "data":response.json()}
    else:
        return {"status":False,
        "data":"Please verify details"} 

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
    url = "https://api.levinfintech.com/api/levin/recharge/bbps-recharge-getbill"
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
        "Content-Type": "application/json"
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
        "content-type": "application/json"
    }
    
    url = "https://api.zwitch.io/v1/transfers"

    response = requests.post(url, json=payload, headers=headers)
    print(response.text)

    if response.ok:
        return {"status":True,
        "data":response.json()}
    else:
        print(response.json())
        return {"status":False,
        "data":"Please verify details"} 
    
def generate_otp(length=6):
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