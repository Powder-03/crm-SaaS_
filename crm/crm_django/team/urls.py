from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeamViewSet, get_my_team, add_member, UserDetail , upgrade_plan , get_stripe_pub_key , create_checkout_session , stripe_webhook , check_session , cancel_plan
router = DefaultRouter()
router.register('teams', TeamViewSet, basename='teams')

urlpatterns = [
    path('', include(router.urls)),
    path('team/get-my-team/', get_my_team, name='get-my-team'),
    path('team/add-member/', add_member, name='add-member'),
    path('team/member/<int:pk>/', UserDetail.as_view(), name='userdetail'),
    path('team/upgrade-plan/', upgrade_plan, name='upgrade-plan'),
    path('stripe/get-stripe-pub-key/', get_stripe_pub_key, name='get-stripe-pub-key'),
    path('stripe/create-checkout-session/', create_checkout_session, name='create-checkout-session'),
    path('stripe/webhook/', stripe_webhook, name='stripe-webhook'),
    path('stripe/check_session/', check_session, name='check_session'),
    path('stripe/cancel_plan/', cancel_plan, name='cancel_plan'),
 
]