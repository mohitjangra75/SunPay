import requests

# url = 'http://localhost:8000/api/register_admin/'
# headers = {
#     'Content-Type': 'application/json',
# }
# user_data = {
#     "role_id": 1,
#     "title_id": 2,
#     "name": "John Smith",
#     "email": "john@example.com",
#     "mobile": "9996543210",
#     "gender_id": 1,
#     "username": "johnsmith",
#     "password": "newpassword123",
#     "address": "123 Oak St",
#     "city_id": 3,
#     "package_id": 3,
#     "parent_id": 3,
#     "login_pin": "1234",
#     "is_email_verify": True,
#     "is_mobile_verify": True,
#     "is_tpin_enabled": True,
#     "tpin": 1234
# }
# response = requests.post(url, json=user_data, headers=headers)
# if response.status_code == 201:
#     print("User created successfully!")
#     print("User ID:", response.json().get('user_id'))
# else:
#     print("Error:", response.text)


url = 'http://127.0.0.1:8000/api/tpin/'
data = {
    'login_id': 'SRT102',
    'password': 'newpassword123',
    'tpin': 1234 
}
response = requests.post(url, data=data)
print(response.status_code)
print(response.json())
