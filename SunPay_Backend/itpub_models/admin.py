from django.contrib import admin

from .models import *
admin.site.register(User)
admin.site.register(CompanyBank)
admin.site.register(Bank)
admin.site.register(State)
admin.site.register(Package)
admin.site.register(Customer)
admin.site.register(FundRequest)
admin.site.register(CompanyDetails)
admin.site.register(BankDetails)
admin.site.register(DMTTransactions)
admin.site.register(UserWallet)
admin.site.register(UserTransactions)
admin.site.register(BBPSModelFields)
admin.site.register(BBPSTransactions)