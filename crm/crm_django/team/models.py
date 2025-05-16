from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Plan(models.Model):
    name = models.CharField(max_length=255)
    max_leads = models.IntegerField(default=5)
    max_clients = models.IntegerField(default=5)
    price = models.IntegerField(default=0)
    
    def __str__(self):
        return self.name
    
    

class Team(models.Model):
    PLAN_ACTIVE = 'active'
    PLAN_CANCELLED = 'cancelled'
    CHOICE_PLAN_STATUS = [
        (PLAN_ACTIVE, 'Active'),
        (PLAN_CANCELLED, 'Cancelled'),
    ]
    name = models.CharField(max_length=255)
    members = models.ManyToManyField(User, related_name='teams')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_teams')
    created_at = models.DateTimeField(auto_now_add=True)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE, related_name='teams', null=True, blank=True)
    plan_status = models.CharField(max_length=25, choices=CHOICE_PLAN_STATUS , default='cancelled')
    plan_end_date = models.DateTimeField(null=True, blank=True)
    stripe_customer_id = models.CharField(max_length=255, null=True, blank=True)
    stripe_subscription_id = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name
    
    