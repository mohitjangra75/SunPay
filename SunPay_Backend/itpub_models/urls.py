# urls.py
from django.urls import path
from .views import *

urlpatterns = [
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

]