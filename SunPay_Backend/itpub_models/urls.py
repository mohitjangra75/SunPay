# urls.py
from django.urls import path
from .views import *
from rest_framework import routers
router = routers.SimpleRouter()
router.register("users", UserViewset)

urlpatterns = [
    path('register_user/', RegisterUser.as_view(), name='register_user'),
    path('get_users/', GetUsers.as_view(), name='register_user'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('tpin/', TPINVerification.as_view(), name='tpin'),
    path('add_beneficiary/', AddBenAccount.as_view(), name='add_beneficiary'),
    path('delete_beneficiary/', DelBenAccount.as_view(), name='delete_beneficiary'),
    path('get_linked_account/', GetAccountLinked.as_view(), name='get_account_linked'),
    path('register_remitter/', RegisterRemitter.as_view(), name='register_remitter'),
    path('funds_transfer/', SendMoneyDMT.as_view(), name='funds_transfer'),
    path('fund_request/', FundRequest.as_view(), name='fund_request'),
    path('update_fund_request/', UpdateFundRequest.as_view(), name='update_fund_request'),
    path('get_fund_request/', GetFundRequest.as_view(), name='get_fund_request'),
    path('pay_recharge/', PayRecharge.as_view(), name='pay_recharge'),
    path('get_biller_details/', GetBillDetails.as_view(), name='get_biller_details'),
    path('get_package_details/', GetSurchargeDetails.as_view(), name='get_package_details'),
    path('verify_otp/', OTPVerification.as_view(), name='verify_otp'),
    path('get_banks/', GetBanks.as_view(), name='get_banks'),
    path('companybanks/', Companybank.as_view(), name='companybanks'),
    path('get_providers/', BBPSproviders.as_view(), name='BBPSproviders'),
    path('get_state/', States.as_view(), name='States'),
    path('paysprintbanks/', Paysprintbanklist.as_view(), name='paysprintbanks'),
    path('get_customer/', CheckCustomer.as_view(), name='CheckCustomer'),
    path('fetch_beneficiary/', fetch_beneficiary.as_view(), name='fetch_beneficiary'),
    path('anshpe/', AnshPayout.as_view(), name='anshpe'),
    path('zpayverify/', zpayverification.as_view(), name='zpayverify'),
    path('zpaygetbank/', zpaygetbeneficiary.as_view(), name='zpaylinkedbanks'),
    path('zpayaddbank/', zpayaddbankbeneficiary.as_view(), name='zpayaddbanks'),
    path('zpayaddupi/', zpayaddvpabeneficiary.as_view(), name='zpayaddupis'),
    path('zpaytransfer/', zpaybanktansfer.as_view(), name='zpaytransferbank'),
    path('zpaygetbeneficiarybyid/', ZPayGetBeneficiaryById.as_view(), name='zpaybenebyid'),
    path('zpayupitransfer/', zpayupitansfer.as_view(), name='zpaytransferupi'),
    path('penny-drop/', PennyDrop.as_view(), name='penny-drop'),
    path('bank-verify/', Bankverify.as_view(), name='bank-verify'),
    path('dmttransaction/', GetDmtTransactions.as_view(), name='dmttransactions'),
    path('dmttransaction/<int:id>/', GetDmtTransactions.as_view(), name='dmttransaction_by_id'),
    path('wallettransactions/', GetWalletTransactions.as_view(), name='wallettransactions'),
    path('wallettransaction/<int:id>/', GetWalletTransactions.as_view(), name='wallettransaction_by_id'),
    path('wallettowallet/', Wallettowallet.as_view(), name='wallettowallet'),
    path('wallettowallettransactions/', GetWallettoWalletTransactions.as_view(), name='wallet_to_wallettransactions'),
    path('wallettowallettransaction/<int:id>/', GetWallettoWalletTransactions.as_view(), name='wallet_to_wallettransaction_by_id'),
    path('bbpstransaction/<int:id>/', GetBBPSTransactions.as_view(), name='BBPStransaction_by_id'),
    path('bbpstransactions/', GetBBPSTransactions.as_view(), name='BBPStransactions'),
    path('dummyrecharge/', PaydummyRecharge.as_view(), name='dummyrecharge'),


    
]

urlpatterns += router.urls