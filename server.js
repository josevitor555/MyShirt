import express from 'express';
import dotenv from 'dotenv';
import stripe from 'stripe';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.get('/', (request, response) => {
    response.sendFile('index.html', {
        root: 'public'
    });
});

app.get('/successPage', (request, response) => {
    response.sendFile('successPage.html', {
        root: 'public',
    });
});
app.get('/failedPage', (request, response) => {
    response.sendFile('failedPage.html', {
        root: 'public',
    });
});

const StripeGateway = stripe(process.env.STRIPE_SECRET_KEY);
// console.log(`Stripe API: ${process.env.STRIPE_SECRET_KEY}`);

const DOMAIN = process.env.DOMAIN;
console.log(typeof DOMAIN, DOMAIN);

// console.log(`Running on ${process.env.DOMAIN}`);

app.post('/stripe-checkout', async (request, response) => {
    try {
        // const { items } = request.body;

        // if (!items || !Array.isArray(items) || items.length === 0) {
        //     return response.status(400).json({ error: 'No items in the cart.' });
        // }

        const lineItems = request.body.items.map((item) => {
            const unitAmount = Math.round(parseFloat(item.price.replace(/[^\d.]/g, '')) * 100);
            console.log(`item-price: ${item.price}`);
            console.log(`unitAmount: ${unitAmount}`);
    
            return {
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: item.title,
                        images: [item.productImg]
                    },
                    unit_amount: unitAmount
                },
                quantity: item.quantity
            };
        });
        console.log(`lineItems: ${JSON.stringify(lineItems)}`);
    
        // Create Checkout Session
        const session = await StripeGateway.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${DOMAIN}/successPage.html`,
            cancel_url: `${DOMAIN}/failedPage.html`,
            line_items: lineItems,
            billing_address_collection: 'required'
        });
        response.json({ url: session.url });
        
    } catch (error) {
        console.error('Error creating checkout session:', error);
        response.status(500).json({ error: 'Failed to create checkout session' });
    }
});

const PORT = process.env.PORT || 3000;
console.log(process.env.PORT);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT} PORT.`);
});