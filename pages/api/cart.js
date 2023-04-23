import { addOrder, addToCart, clearCart, connectDatabase, getCart, getOrders, getProduct, removeFromCart } from "@/db/db";

// register user: name, email, password
export default async function handler(req, res) {
    // get db
    const client = await connectDatabase();
    
    const { operation, user_id, data } = req.body;

    // get db
    const db = client.db();

    if(operation == 'add') {
        const { product } = data;

        await addToCart(db, user_id, product);

        res.status(200).json({ success: true });
    }

    if(operation == 'get') {
        const cart = await getCart(db, user_id);

        const products = [];

        for(const prod of cart.products) {
            const product = await getProduct(db, prod.product_id);

            products.push({
                ...product,
                quantityOrdered: prod.quantity,
            });
        }

        res.status(200).json({ success: true, products });
    }

    if(operation == 'remove') {
        const { product } = data;

        await removeFromCart(db, user_id, product);

        res.status(200).json({ success: true });
    }

    if(operation == 'checkout') {
        const cart = await getCart(db, user_id);

        const products = [];

        for(const prod of cart.products) {
            const product = await getProduct(db, prod.product_id);

            products.push({
                ...product,
                quantityOrdered: prod.quantity,
            });
        }

        const order = {
            user_id,
            products,
            date: new Date(),
        };

        await addOrder(db, order);

        // clear cart
        await clearCart(db, user_id);

        res.status(200).json({ success: true });
    }

    // get orders
    if(operation == 'orders') {
        const orders = await getOrders(db, user_id);

        const processedOrders = [];

        // add total price for each order
        for(const order of orders) {
            let totalPrice = 0;

            for(const product of order.products) {
                totalPrice += product.price * product.quantityOrdered;
            }

            processedOrders.push({
                ...order,
                totalPrice,
            });
        }

        res.status(200).json({ success: true, orders: processedOrders });
    }
}