# urls.py
from django.urls import path
from .views import *
from rest_framework import routers
router = routers.SimpleRouter()
router.register(r"users", UserViewset)

urlpatterns = [
    path('register_user/', RegisterUser.as_view(), name='register_user'),
    path('get_users/', GetUser.as_view(), name='register_user'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('tpin/', TPINVerification.as_view(), name='tpin'),
    path('add_beneficiary/', AddBenAccount.as_view(), name='add_beneficiary'),
    path('delete_beneficiary/', DelBenAccount.as_view(), name='delete_beneficiary'),
    path('get_linked_beneficiaries/', GetBeneficiaryLinked.as_view(), name='get_linked_beneficiaries'),
    path('register_remitter/', RegisterRemitter.as_view(), name='register_remitter'),
    path('funds_transfer/', SendMoneyDMT.as_view(), name='funds_transfer'),
    path('fund_request/', FundRequest.as_view(), name='fund_request'),
    path('pay_recharge/', PayRecharge.as_view(), name='pay_recharge'),
    path('get_biller_details/', GetBillDetails.as_view(), name='get_biller_details'),
    path('get_package_details/', GetPackageDetails.as_view(), name='get_package_details'),
    path('login_with_otp/', LoginOTPView.as_view(), name='login_with_otp'),
    path('verify_otp/', OTPVerification.as_view(), name='verify_otp'),
]

urlpatterns += router.urls