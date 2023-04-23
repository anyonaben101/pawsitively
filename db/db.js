import { ObjectId } from 'mongodb';

const MongoClient = require('mongodb').MongoClient;

const seedproducts = require('./productsData.json');

// const ObjectID = require('mongodb').ObjectID;

// get mongo client
async function connectDatabase() {
    const client = await MongoClient.connect(process.env.MONGODB_URI);

    return client;
}

async function ensureCollections(client) {
    // list of collections to ensure
    const collections = ['users', 'products', 'orders', 'seeds', 'cart', 'wishlist', 'users_pets'];

    // get db
    const db = client.db();

    // ensure collections
    for (const collection of collections) {
        // check if collection exists
        const exists = await db.listCollections({ name: collection }).hasNext();

        // if not, create it
        if (!exists) {
            await db.createCollection(collection);
        }
    }

    
    // get seed: products_seed
    const seed = await getSeed(db, 'products_seed');
    
    // if seed doesn't exist, insert it
    if (!seed) {
        // seed products
        await seedProducts(db, seedproducts);
        
        // create indexes: products -> name
        await db.collection('products').createIndex({ name: 'text' });
        
        // insert seed
        await insertSeed(db, {
            name: 'products_seed',
            date: new Date(),
        });
    }
}

// insert pet
async function insertPet(db, pet) {
    // get pets collection
    const pets = db.collection('users_pets');

    // insert pet
    const result = await pets.insertOne(pet);

    return result;
}

// get pet by id
async function getPet(db, id) {
    const collection = db.collection('users_pets');

    const pet = await collection.findOne({ _id: new ObjectId(id) });

    return pet;
}

// get pets by user id
async function getPets(db, user_id) {
    const collection = db.collection('users_pets');

    const pets = await collection.find({ user_id }).toArray();

    return pets;
}

// delete pet by id
async function deletePet(db, id) {
    const collection = db.collection('users_pets');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return result;
}

// insert user: name, email, password
async function insertUser(db, user) {
    // get users collection
    const users = db.collection('users');

    // insert user
    const result = await users.insertOne(user);

    return result;
}

// get user by email
async function getUser(db, email) {
    const collection = db.collection('users');
    const result = await collection.findOne({ email });

    return result;
}

// validate login
async function validateLogin(db, email, password) {
    // get user
    const user = await getUser(db, email);

    // if user exists, check password
    if (user) {
        return user.password === password;
    }

    // user doesn't exist
    return false;
}

// insert seed: name, date run
async function insertSeed(db, seed) {
    // get seeds collection
    const seeds = db.collection('seeds');

    // insert seed
    const result = await seeds.insertOne(seed);

    return result;
}

// get seed by name
async function getSeed(db, name) {
    const collection = db.collection('seeds');

    const seed = await collection.findOne({ name });

    return seed;
}

// seed products
async function seedProducts(db, prods) {
    // get products collection
    const products = db.collection('products');

    // insert products
    const result = await products.insertMany(prods);

    return result;
}

// get products
async function getProducts(db, filter) {
    const collection = db.collection('products');

    const products = await collection.find(filter).toArray();

    return products;
}

// get product by id
async function getProduct(db, id) {
    const collection = db.collection('products');

    const product = await collection.findOne({ _id: new ObjectId(id) });

    return product;
}

// search products
async function searchProducts(db, query) {
    const collection = db.collection('products');

    const products = await collection.find({ $text: { $search: query } }).toArray();

    return products;
}

// get a users cart
async function getCart(db, user_id) {
    const collection = db.collection('cart');

    const cart = await collection.findOne({ user_id });

    // if cart exists, return it
    if (cart) {
        return cart;
    } else {
        // if cart doesn't exist, create it
        const newCart = {
            user_id,
            products: [],
        };

        // insert new cart
        await collection.insertOne(newCart);

        return newCart;
    }
}

// add product to cart
async function addToCart(db, user_id, product_id) {
    // get cart
    const cart = await getCart(db, user_id);

    // get cart products
    const products = cart.products;

    // if product is already in cart, increment quantity
    const index = products.findIndex((product) => product.product_id === product_id);

    if (index !== -1) {
        products[index].quantity++;
    } else {
        // if product is not in cart, add it
        products.push({
            product_id,
            quantity: 1,
        });
    }

    // update cart
    const collection = db.collection('cart');

    const result = await collection.updateOne(
        { user_id },
        { $set: { products } }
    );

    return result;
}

// remove product from cart
async function removeFromCart(db, user_id, product_id) {
    // get cart
    const cart = await getCart(db, user_id);

    // get cart products
    const products = cart.products;

    // if product is in cart, remove it
    const index = products.findIndex((product) => product.product_id === product_id);

    if (index !== -1) {
        products.splice(index, 1);

        // update cart
        const collection = db.collection('cart');

        const result = await collection.updateOne(
            { user_id },
            { $set: { products } }
        );

        console.log(result);

        return result;
    }

    return null;
}

// clear cart
async function clearCart(db, user_id) {
    // get cart
    const cart = await getCart(db, user_id);

    // get cart products
    const products = cart.products;

    // if cart has products, remove them
    if (products.length > 0) {
        // update cart
        const collection = db.collection('cart');

        const result = await collection.updateOne(
            { user_id },
            { $set: { products: [] } }
        );

        return result;
    }

    return null;
}

// get a users wishlist
async function getWishlist(db, user_id) {
    const collection = db.collection('wishlist');

    // get wishlist
    const list = await collection.findOne({ user_id });

    // if wishlist exists, return it
    if (list) {
        return list;
    } else {
        // if wishlist doesn't exist, create it
        const newList = {
            user_id,
            products: [],
        };

        // insert new wishlist
        await collection.insertOne(newList);

        return newList;
    }

}

// add product to wishlist
async function addToWishlist(db, user_id, product_id) {
    // get wishlist
    const list = await getWishlist(db, user_id);

    // get wishlist products
    const products = list.products;

    // if product is already in wishlist, do nothing
    const index = products.findIndex((product) => product.product_id === product_id);

    if (index === -1) {
        // if product is not in wishlist, add it
        products.push({
            product_id,
        });

        // update wishlist
        const collection = db.collection('wishlist');

        const result = await collection.updateOne(
            { user_id },
            { $set: { products } }
        );

        return result;
    }

    return null;
}

// remove product from wishlist
async function removeFromWishlist(db, user_id, product_id) {
    // get wishlist
    const list = await getWishlist(db, user_id);

    // get wishlist products
    const products = list.products;

    // if product is in wishlist, remove it
    const index = products.findIndex((product) => product.product_id === product_id);

    if (index !== -1) {
        products.splice(index, 1);

        // update wishlist
        const collection = db.collection('wishlist');

        const result = await collection.updateOne(
            { user_id },
            { $set: { products } }
        );

        return result;
    }

    return null;
}

// clear wishlist
async function clearWishlist(db, user_id) {
    // get wishlist
    const list = await getWishlist(db, user_id);

    // get wishlist products
    const products = list.products;

    // if wishlist has products, remove them
    if (products.length > 0) {
        // update wishlist
        const collection = db.collection('wishlist');

        const result = await collection.updateOne(
            { user_id },
            { $set: { products: [] } }
        );

        return result;
    }

    return null;
}

// get a users orders
async function getOrders(db, user_id) {
    const collection = db.collection('orders');

    // get orders: order by date, newest first
    const orders = await collection.find({ user_id }).sort({ date: -1 }).toArray();

    return orders;
}

// add order
async function addOrder(db, order) {
    // get orders collection
    const orders = db.collection('orders');
    // insert order
    const result = await orders.insertOne(order);

    return result;
}

// delete order
async function deleteOrder(db, order_id) {
    // get orders collection
    const orders = db.collection('orders');

    // delete order
    const result = await orders.deleteOne({ _id: new ObjectId(order_id) });

    return result;
}


export {
    connectDatabase,
    ensureCollections,
    insertUser,
    getUser,
    validateLogin,
    insertSeed,
    getSeed,
    getProducts,
    getProduct,
    getCart,
    addToCart,
    removeFromCart,
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    getOrders,
    addOrder,
    deleteOrder,
    clearCart,
    clearWishlist,
    insertPet,
    getPets,
    getPet,
    deletePet,
    searchProducts,
}