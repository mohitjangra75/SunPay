import requests
import json

# url = 'http://localhost:8000/api/register_user/'
# headers = {
#     'Content-Type': 'application/json',
# }
# user_data = {
#     "role_id": 3,
#     "title_id": 1,
#     "name": "Dane Joe",
#     "email": "123dane1@example.com",
#     "mobile": "8708070098",
#     "gender_id": 1,
#     "username": "danejoe",
#     "password": "newpassword123",
#     "address": "123 Oak St",
#     "city_id": 3,
#     "package_id": 3,
#     "parent_id": 3,
#     "login_pin": "1234",
#     "is_email_verify": True,
#     "is_mobile_verify": True,
#     "is_tpin_enabled": True,
#     "tpin": 1357
# }
# response = requests.post(url, json=user_data, headers=headers)
# if response.status_code == 201:
#     print("User created successfully!")
#     print("User ID:", response.json().get('user_id'))
# else:
#     print("Error:", response.text)


# url = 'http://127.0.0.1:8000/api/tpin/'
# data = {
#     'login_id': 'SRT102',
#     'password': 'newpassword123',
#     'tpin': 1234 
# }
# response = requests.post(url, data=data)
# print(response.status_code)
# print(response.json())


# base_url = "http://127.0.0.1:8000/api/"
# login_url = base_url + "login_with_otp/"
# verify_otp_url = base_url + "verify_otp/"
# username = "EMP101"
# password = "ABC@123"
# login_response = requests.post(login_url, data={"login_id": username, "password": password})
# print("Login with OTP:", login_response.content.decode(), login_response.status_code)
# if login_response.status_code == 200:
#     response_json = login_response.json()
#     entered_otp = input("Enter OTP received: ")
#     stored_otp = response_json.get('otp_stored') 
#     otp_verification_response = requests.post(verify_otp_url, data={"login_id": username, "otp_entered": entered_otp, "otp_stored": stored_otp})
#     print("OTP Verification:", otp_verification_response.content.decode(), otp_verification_response.status_code)
# else:
#     print("Error")


# def add_beneficiary():
#     url = "http://127.0.0.1:8000/api/add_beneficiary/"
#     payload = {
#         "upi_id": "Pankajbhardwaj@paytm",
#         "beneficiary_name": "Pankaj",
#         "bank_name": "State Bank of India",
#         "account_number": "123456789",
#         "ifsc_code": "ABCD1234567",
#         "mobile_number": "9306123897",
#         "registered_with": 37, 
#         "bene_id": "78901234",
#     }
#     headers = {
#         "Content-Type": "application/json"
#     }

#     response = requests.post(url, json=payload, headers=headers)

#     if response.status_code == 201:
#         print("Beneficiary added successfully.")
#         print("Response:", response.json())
#     else:
#         print("Failed to add beneficiary.")
#         print("Response:", response.text)

# if __name__ == "__main__":
#     add_beneficiary()


def initiate_fund_request():
    url = "http://127.0.0.1:8000/api/fund_request/"
    payload = {
        "amount" : 100,
        "bank_acc_number" : "52626263163",
        "ref_number" : "58461",
        "payment_mode": "cash",
        "payment_date" : "2023-04-04",
        "remark" : "remark",
        "mobile_number" : "9306123897"
    }
    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        print("Fund request initiated successfully.")
        print("Response:", response.json())
    else:
        print("Failed to initiate fund request.")
        print("Response:", response.text)

if __name__ == "__main__":
    initiate_fund_request()