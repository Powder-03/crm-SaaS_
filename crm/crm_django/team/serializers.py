from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Team , Plan


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']
        

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ['id', 'name', 'max_leads', 'max_clients', 'price']

class TeamSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)
    created_by = UserSerializer(read_only=True)
    leads = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = ['id', 'name', 'members', 'created_by', 'leads' , 'plan_end_date']

    def get_leads(self, obj):
        from lead.serializers import LeadSerializer  # Lazy import here!
        leads = obj.leads.all()
        return LeadSerializer(leads, many=True).data