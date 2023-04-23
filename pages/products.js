import Product from "@/components/Product";
import { connectDatabase, ensureCollections, getProducts, searchProducts } from "@/db/db";
import { useEffect, useState } from "react";
import toastr from "toastr";
import { useRouter } from 'next/router'

function products({ products }) {
    const router = useRouter();

    const [user, setUser] = useState(null);

    // loader
    const [loading, setLoading] = useState(true);
    const [hasParams, setHasParams] = useState(false);

    // check if user is logged in, local storage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        // if user is logged in, show profile
        if (user) {
            setUser(user);
            setLoading(false);

            // check if query params exist
            if (router.query && router.query.q) {
                setHasParams(true);
            } else {
                setHasParams(false);
            }
        } else {
            // redirect to login page
            window.location.href = "/login";
        }
    }, []);

    // add product to cart
    const addToCart = async (product) => {
        // send post request to /api/cart
        const res = await fetch("/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                operation: "add",
                user_id: user.id,
                data: {
                    product,
                },
            }),
        });

        // get response
        const data = await res.json();

        // if successful, add product to cart
        if (data.success) {
            toastr.success("Successfully added to cart");
        }
        // if failed, show error
        else {
            toastr.error("Failed to add to cart");
        }
    }

    // add product to wishlist
    const addToWishlist = async (product) => {
        // send post request to /api/wishlist
        const res = await fetch("/api/wishlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                operation: "add",
                user_id: user.id,
                data: {
                    product,
                },
            }),
        });

        // get response
        const data = await res.json();

        // if successful, add product to wishlist
        if (data.success) {
            toastr.success("Successfully added to wishlist");
        }
        // if failed, show error
        else {
            toastr.error("Failed to add to wishlist");
        }

    }

    return (<>
        <div style={{
            // linear gradient from #0073ff to #00c4ff
            backgroundImage: "linear-gradient(90deg, #0073ff 0%, #00c4ff 100%)",
        }}>
            {/* if loading */}
            {loading ? (
                <div className='py-5 text-center text-light'>
                    <p className='display-4 font-weight-bold'>Loading products...</p>
                </div>
            ) : (
                <>
                    <div className="container">
                        <div className="clearfix">
                            <div className="float-left">
                                {/* if has params */}
                                {hasParams ? (
                                    <h1 className="py-4 text-light">Search results for "{router.query.q}"</h1>
                                ) : (
                                <h1 className="py-4 text-light">Shop stuff for your pets!</h1>
                                )}
                            </div>
                            <div className="float-right">
                                <a href="/cart" className="btn btn-lg btn-light mt-4">View cart</a>
                            </div>
                        </div>
                        {products.map((product) => (
                            <div key={product.id}>
                                <Product product={product} addToCart={addToCart} addToWishlist={addToWishlist} />
                            </div>
                        ))}
                    </div>
                    <div className='py-5'></div>
                    <div className='py-5'></div>
                </>
            )}
        </div>
    </>)
}

// get server-side props
export async function getServerSideProps(context) {
    // get db
    const client = await connectDatabase();

    // ensure collections exist
    await ensureCollections(client);

    // get db
    const db = client.db();

    let products = [];
    // has query
    if (context.query && context.query.q) {
        // search by name
        if (context.query.q) {
            products = await searchProducts(db, context.query.q);
        }
    } else {
        // get products
        products = await getProducts(db, {});
    }

    const filteredProducts = products.map((product) => {
        return {
            id: product._id.toString(),
            name: product.name,
            image: product.image_file,
            price: product.price,
            description: product.prod_description,
            quantity: product.quantity,
            age_preferred: product.age_preferred,
        }
    });


    // return products
    return {
        props: {
            products: filteredProducts,
        }
    }
}

export default products;