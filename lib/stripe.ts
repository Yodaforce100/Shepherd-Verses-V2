import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})

// Price IDs (will be set after creating products in Stripe)
export const PRICES = {
  tier1: process.env.STRIPE_PRICE_TIER1 || '', // $5/month
  tier2: process.env.STRIPE_PRICE_TIER2 || '', // $10/month
  tier3: process.env.STRIPE_PRICE_TIER3 || '', // $20/month
}
