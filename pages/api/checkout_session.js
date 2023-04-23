import { connectDatabase, getCart, getProduct } from '@/db/db';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    // get db
    const client = await connectDatabase();

    let host = req.headers.host;
    let protocol = 'http';
    if (host.indexOf('localhost') === -1) {
        protocol = 'https';
    }

    const { user_id } = req.body;

    // get db
    const db = client.db();

    if (req.method === 'POST') {
        const cart = await getCart(db, user_id);

        const line_items = [];

        for (const prod of cart.products) {
            const product = await getProduct(db, prod.product_id);

            let pPrice = product.price.toFixed(2);
            pPrice = pPrice.replace('.', '');
            pPrice = parseInt(pPrice);

            const line_item = {

                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name,
                        // images: [`http://localhost:3000${product.image_file}`],
                    },
                    unit_amount: pPrice,
                },
                quantity: prod.quantity,
            };

            line_items.push(line_item);
        }
        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                shipping_address_collection: { allowed_countries: ['US', 'CA', 'KE'] },
                shipping_options: [
                    {
                        shipping_rate_data: {
                            type: 'fixed_amount',
                            fixed_amount: { amount: 0, currency: 'usd' },
                            display_name: 'Free shipping',
                            delivery_estimate: {
                                minimum: { unit: 'business_day', value: 5 },
                                maximum: { unit: 'business_day', value: 7 },
                            },
                        },
                    },
                    {
                        shipping_rate_data: {
                            type: 'fixed_amount',
                            fixed_amount: { amount: 1500, currency: 'usd' },
                            display_name: 'Next day air',
                            delivery_estimate: {
                                minimum: { unit: 'business_day', value: 1 },
                                maximum: { unit: 'business_day', value: 1 },
                            },
                        },
                    },
                ],
                line_items: line_items,
                mode: 'payment',
                success_url: `${protocol}://${host}/checkout`,
                cancel_url: `${protocol}://${host}/cart`,
            });

            res.status(200).json({ success: true, url: session.url });
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}