import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Header() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    const [search, setSearch] = useState("");

    // search
    const searchProducts = async (e) => {
        e.preventDefault();

        // redirect to search page
        // window.location.href = `/products?q=${search}`;
        router.push(`/products?q=${search}`);
    };

    // check if user is logged in, local storage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        // if user is logged in, show profile
        if (user) {
            setUser(user);
        }

        // check if query params exist
        if (router.query && router.query.q) {
            setSearch(router.query.q);
        } else {
            setSearch("");
        }
    }, []);

    return (
        <>
            <nav style={{
                backgroundColor: "#1c1917",
            }} className="navbar navbar-expand-lg navbar-light py-3 px-4">
                <a className="navbar-brand" href="/">
                    <img src="/images/logo.png" width="130" height="130" className="d-inline-block align-top" alt="" loading="lazy" />
                </a>
                <button className="navbar-toggler text-light" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    ...
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link text-light" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" href="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" href="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" href="/support">Support</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" href="/services">Services</Link>
                        </li>
                        <li className="nav-item">
                            {/* if user */}
                            {user ? (
                                <Link className="nav-link text-light" href="/logout">Logout ({user.name})</Link>
                            ) : (
                                <Link className="nav-link text-light" href="/login">Login</Link>
                            )}
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" value={search} type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
                        <button className="btn btn-primary my-2 my-sm-0" type="submit" onClick={searchProducts}>Search</button>
                    </form>
                </div>
            </nav>
        </>
    );
}

export default Header;