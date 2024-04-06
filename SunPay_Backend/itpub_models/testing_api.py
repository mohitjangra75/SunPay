import requests

url = 'http://localhost:8000/api/register_user/'
headers = {
    'Content-Type': 'application/json',
}
user_data = {
    "role_id": 3,
    "title_id": 1,
    "name": "Dane Joe",
    "email": "123dane1@example.com",
    "mobile": "8708070098",
    "gender_id": 1,
    "username": "danejoe",
    "password": "newpassword123",
    "address": "123 Oak St",
    "city_id": 3,
    "package_id": 3,
    "parent_id": 3,
    "login_pin": "1234",
    "is_email_verify": True,
    "is_mobile_verify": True,
    "is_tpin_enabled": True,
    "tpin": 1357
}
response = requests.post(url, json=user_data, headers=headers)
if response.status_code == 201:
    print("User created successfully!")
    print("User ID:", response.json().get('user_id'))
else:
    print("Error:", response.text)


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
# username = "SRT101"
# password = "newpassword123"
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


