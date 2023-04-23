import CartItem from "@/components/CartItem";
import { useEffect, useState } from "react";
import toastr from "toastr";

function cart() {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(null);
    // loader
    const [loading, setLoading] = useState(true);

    // total price
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkedOut, setCheckedOut] = useState(false);

    const fetchCart = async (user_id) => {
        // fetch cart from /api/cart
        const res = await fetch("/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                operation: "get",
                user_id: user_id
            }),
        });

        // get response
        const data = await res.json();

        // if successful, set cart
        if (data.success) {
            setCart(data.products);

            // calculate total price
            let total = 0;
            data.products.forEach((product) => {
                total += (product.price * product.quantityOrdered);
            });
            setTotalPrice(total);
            setLoading(false);
        }
        // if failed, show error
        else {
            toastr.error("Failed to fetch cart");
        }
    };

    const removeFromCart = async (product_id) => {
        // send post request to /api/cart
        const res = await fetch("/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                operation: "remove",
                user_id: user.id,
                data: {
                    product: product_id,
                },
            }),
        });

        // get response
        const data = await res.json();

        // if successful, remove product from cart
        if (data.success) {
            toastr.success("Successfully removed from cart");
            fetchCart(user.id);
        }

        // if failed, show error
        else {
            toastr.error("Failed to remove from cart");
        }
    };

    const checkout = async () => {
        // send post request to /api/cart
        // const res = await fetch("/api/cart", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         operation: "checkout",
        //         user_id: user.id,
        //         data: {
        //         },
        //     }),
        // });

        const res = await fetch("/api/checkout_session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user.id,
            }),
        });

        // get response
        const data = await res.json();

        if (data.success) {
            window.location.href = data.url;
        }

        // if failed, show error
        else {
            toastr.error("Failed to checkout");
        }
    };

    // check if user is logged in, local storage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        // if user is logged in, show profile
        if (user) {
            setUser(user);

            // fetch cart
            fetchCart(user.id);
        } else {
            // redirect to login page
            window.location.href = "/login";
        }
    }, []);

    return (<>
        <div style={{
            // linear gradient from #0073ff to #00c4ff
            backgroundImage: "linear-gradient(90deg, #0073ff 0%, #00c4ff 100%)",
            minHeight: "100vh",
        }}>
            {/* if loading */}
            {loading ? (
                <div className='py-5 text-center text-light'>
                    <p className='display-4 font-weight-bold'>Loading cart...</p>
                </div>
            ) : (
                <>
                    {!checkedOut ? (
                    <div className="container">
                        <div className="clearfix">
                            <div className="float-left">
                                <h1 className="py-4 text-light">Cart</h1>
                            </div>
                            <div className="float-right">
                                <a href="/products" className="btn btn-lg btn-light mt-4">Shop more products</a>
                            </div>
                        </div>
                        {cart && cart.map((product) => (
                            <div key={product._id}>
                                <CartItem product={product} removeFromCart={removeFromCart} />
                            </div>
                        ))}
                        {/* if cart is empty */}
                        {cart && cart.length === 0 && (
                            <div className="py-5 text-center text-light">
                                <p className="display-4 font-weight-bold">Cart is empty</p>
                                <a href="/products" className="btn btn-light">Shop now</a>
                            </div>
                        )}
                        {/* else */}
                        {cart && cart.length > 0 && (
                            <div className="py-5 text-right text-light">
                                {/* to 2 decimal places */}
                                <p className="display-4 font-weight-bold">Total: ${totalPrice.toFixed(2)}</p>
                                <button className="btn btn-lg btn-light" onClick={checkout}>Checkout</button>
                            </div>
                        )}
                    </div>
                    ) : (
                        <div className="container">
                            <h1 className="py-4 text-light">Your order has been placed!</h1>
                            <a href="/products" className="btn btn-lg btn-light">Shop more products</a>
                        </div>
                    )}
                    <div className='py-5'></div>
                    <div className='py-5'></div>
                </>
            )}
        </div>
    </>);
}

export default cart;