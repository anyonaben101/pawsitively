import { addToWishlist, clearWishlist, connectDatabase, getWishlist, getProduct, removeFromWishlist } from "@/db/db";

// register user: name, email, password
export default async function handler(req, res) {
    // get db
    const client = await connectDatabase();
    
    const { operation, user_id, data } = req.body;

    // get db
    const db = client.db();

    if(operation == 'add') {
        const { product } = data;

        await addToWishlist(db, user_id, product);

        res.status(200).json({ success: true });
    }

    if(operation == 'get') {
        const cart = await getWishlist(db, user_id);

        const products = [];

        for(const prod of cart.products) {
            const product = await getProduct(db, prod.product_id);

            products.push({
                ...product,
            });
        }

        res.status(200).json({ success: true, products });
    }

    if(operation == 'remove') {
        const { product } = data;

        await removeFromWishlist(db, user_id, product);

        res.status(200).json({ success: true });
    }
}
