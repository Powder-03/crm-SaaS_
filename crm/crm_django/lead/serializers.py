from rest_framework import serializers
from .models import Lead
from team.serializers import UserSerializer

class LeadSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    class Meta:
        model = Lead
        fields = '__all__'