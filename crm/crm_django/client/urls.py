from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientViewSet , NoteViewSet , convert_lead_to_client , delete_client

router = DefaultRouter()
router.register(r'clients', ClientViewSet, basename='clients')
router.register(r'notes', NoteViewSet, basename='notes')
urlpatterns = [
    path('', include(router.urls)),
    path('convert-lead-to-client/', convert_lead_to_client, name='convert-lead-to-client'),
    path('client/delete_client/<int:client_id>/', delete_client, name='delete_client'),
    
    
]

