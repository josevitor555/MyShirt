import express from 'express';
import dotenv from 'dotenv';
import stripe from 'stripe';
import cors from 'cors';
import path from 'path';

dotenv.config();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Servindo o Arquivo gerado pelo Tailwind da pasta /dist
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// Servindo o arquivo index.html da pasta /public
app.get('/', (request, response) => {
    response.sendFile('index.html', { root: 'public' });
});

app.get('/successPage', (request, response) => {
    response.sendFile('successPage.html', { root: 'public' });
});

app.get('/failedPage', (request, response) => {
    response.sendFile('failedPage.html', { root: 'public', });
});

const StripeGateway = stripe(process.env.STRIPE_SECRET_KEY);
const DOMAIN = process.env.DOMAIN;

const applyDiscount = (price, discountPercentage) => {
    return price - (price * discountPercentage / 100);
};

app.post('/stripe-checkout', async (request, response) => {
    try {
        const { discountCode } = request.body;
        const validCoupons = { "DISCONTO30": 30, "SAVE30": 30, "PROMO30": 30 };
        let discountPercentage = 0;

        if (validCoupons[discountCode]) {
            discountPercentage = validCoupons[discountCode];
        }

        const lineItems = request.body.items.map((item) => {
            let unitAmount = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
            
            if (discountPercentage > 0) {
                unitAmount = applyDiscount(unitAmount, discountPercentage);
            }

            unitAmount = parseInt(unitAmount * 100);

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

        // Create Checkout Session
        const session = await StripeGateway.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${DOMAIN}/successPage.html`,
            cancel_url: `${DOMAIN}/failedPage.html`,
            line_items: lineItems,
            // billing_address_collection: 'required'
        });
        response.json({ url: session.url });

    } catch (error) {
        console.error('Error creating checkout session:', error);
        response.status(500).json({ error: 'Failed to create checkout session' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT} PORT.`);
});