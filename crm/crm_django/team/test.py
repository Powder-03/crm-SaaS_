import stripe
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Set API key from environment variable
stripe.api_key = os.environ.get('STRIPE_API_KEY')

# Only run this code if the API key is available
if stripe.api_key:
    product_id = "prod_SJNsaF87IxWtz2"  # your actual product ID
    try:
        prices = stripe.Price.list(product=product_id)
        for price in prices.data:
            print(f"Price ID: {price.id}, Amount: {price.unit_amount}, Recurring: {price.recurring}")
    except Exception as e:
        print(f"Error connecting to Stripe: {e}")
else:
    print("Stripe API key not found. Please set the STRIPE_API_KEY environment variable.")