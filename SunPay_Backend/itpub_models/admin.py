from django.contrib import admin

from .models import *
admin.site.register(User)
admin.site.register(BankDetails)
admin.site.register(DMTTransactions)
admin.site.register(UserWallet)
admin.site.register(UserTransactions)
admin.site.register(BBPSModelFields)
admin.site.register(BBPSTransactions)