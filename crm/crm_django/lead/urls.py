from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeadViewSet, delete_lead

router = DefaultRouter()
router.register('leads', LeadViewSet, basename='leads')

urlpatterns = [
    path('', include(router.urls)),
    path('lead/delete_lead/<int:pk>/', delete_lead, name='delete_lead'),
]