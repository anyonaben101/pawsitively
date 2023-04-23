import CartItem from "@/components/CartItem";
import WishlistItem from "@/components/WishlistItem";
import { useEffect, useState } from "react";
import toastr from "toastr";

function wishlist() {
    const [user, setUser] = useState(null);
    const [wishlist, setWishlist] = useState(null);
    // loader
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async (user_id) => {
        // fetch wishlist from /api/wishlist
        const res = await fetch("/api/wishlist", {
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

        // if successful, set wishlist
        if (data.success) {
            setWishlist(data.products);
            setLoading(false);
        }
        // if failed, show error
        else {
            toastr.error("Failed to fetch cart");
        }
    };

    const removeFromWishlist = async (product_id) => {
        // send post request to /api/wishlist
        const res = await fetch("/api/wishlist", {
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

        // if successful, remove product from wishlist
        if (data.success) {
            toastr.success("Successfully removed from wishlist");
            fetchWishlist(user.id);
        }

        // if failed, show error
        else {
            toastr.error("Failed to remove from wishlist");
        }
    };

    // check if user is logged in, local storage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        // if user is logged in, show profile
        if (user) {
            setUser(user);

            // fetch cart
            fetchWishlist(user.id);
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
                    <div className="container">
                        <div className="clearfix">
                            <div className="float-left">
                                <h1 className="py-4 text-light">My Wishlist</h1>
                            </div>
                            <div className="float-right">
                                <a href="/products" className="btn btn-lg btn-light mt-4">Explore products</a>
                            </div>
                        </div>
                        {wishlist && wishlist.map((product) => (
                            <div key={product._id}>
                                <WishlistItem product={product} removeFromWishlist={removeFromWishlist} />
                            </div>
                        ))}
                        {/* if wishlist is empty */}
                        {wishlist && wishlist.length === 0 && (
                            <div className="py-5 text-center text-light">
                                <p className="display-4 font-weight-bold">Wishlist is empty</p>
                                <a href="/products" className="btn btn-light">Explore products</a>
                            </div>
                        )}
                    </div>

                    <div className='py-5'></div>
                    <div className='py-5'></div>
                </>
            )}
        </div>
    </>);
}

export default wishlist;