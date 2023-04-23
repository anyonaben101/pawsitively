import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function checkout() {
    const router = useRouter();

    const [user, setUser] = useState(null);

    // total price
    const [checkedOut, setCheckedOut] = useState(false);

    // check if user is logged in, local storage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        // if user is logged in, show profile
        if (user) {
            setUser(user);
            // sleep for 2 seconds
            setTimeout(() => {
                checkout(user);
            }, 3000);
        } else {
            // redirect to login page
            window.location.href = "/login";
        }
    }, []);

    const checkout = async (user) => {
        // send post request to /api/cart
        const res = await fetch("/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                operation: "checkout",
                user_id: user.id,
                data: {
                },
            }),
        });

        // get response
        const data = await res.json();

        if (data.success) {
            setCheckedOut(true);

            // after 5 seconds, redirect to profile
            setTimeout(() => {
                router.push("/profile");
            }, 5000);
        }

        // if failed, show error
        else {
            toastr.error("Failed to checkout");
        }
    };
    return (<>
        <div style={{
            // linear gradient from #0073ff to #00c4ff
            backgroundImage: "linear-gradient(90deg, #0073ff 0%, #00c4ff 100%)",
            minHeight: "100vh",
        }}>
            {!checkedOut ? (
                <div className='py-5 text-center text-light'>
                    <p className='display-4 font-weight-bold'>We are placing your order</p>
                </div>
            ) : (
                <div className="container">
                    <h1 className="py-4 text-light">Your order has been placed!</h1>
                    <a href="/products" className="btn btn-lg btn-light">Shop more products</a>
                </div>
            )}
            <div className='py-5'></div>
            <div className='py-5'></div>
        </div>
    </>);
}

export default checkout;