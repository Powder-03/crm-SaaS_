from django.contrib import admin

# Register your models here.
from .models import Plan , Team

admin.site.register(Plan)
admin.site.register(Team)

