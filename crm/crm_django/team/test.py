import stripe

# Set your API key in an environment variable or .env file, not in source code
# stripe.api_key = os.environ.get('STRIPE_API_KEY')
# Example of how to load API key securely from environment variable

product_id = "prod_example"  # replace with your actual product ID in production
# prices = stripe.Price.list(product=product_id)

# Example code to process prices:
# for price in prices.data:
#     print(f"Price ID: {price.id}, Amount: {price.unit_amount}, Recurring: {price.recurring}")