from django.contrib import admin

from .models import *
admin.site.register(User)
admin.site.register(CompanyBank)
admin.site.register(Bank)
admin.site.register(Surcharge)
admin.site.register(CompanyDetails)
admin.site.register(BankDetails)
admin.site.register(DMTTransactions)
admin.site.register(UserWallet)
admin.site.register(FundRequests)
admin.site.register(BBPSTransactions)
admin.site.register(BBPSProviders)
admin.site.register(State)
admin.site.register(Customer)
admin.site.register(PaysprintBanks)
admin.site.register(ZpayBankDetail)
admin.site.register(WalletTransactions)
admin.site.register(Wallet_to_Wallet_transaction)