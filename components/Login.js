import { useState } from "react";
import toastr from "toastr";

function Login() {
    // login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // register
    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");

    // login
    const handleLogin = async (e) => {
        e.preventDefault();

        // send login request to /login
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        // get response
        const data = await res.json();

        // if login successful, redirect to home page
        if (data.success) {
            // insert user into local storage
            localStorage.setItem("user", JSON.stringify(data.user));

            window.location.href = "/profile";
        } else {
            // login failed
            toastr.error("Incorrect email or password");
        }
    };

    // register
    const handleRegister = async (e) => {
        e.preventDefault();

        // send register request to /register
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: regName,
                email: regEmail,
                password: regPassword,
            }),
        });

        // get response
        const data = await res.json();

        // if register successful, redirect to home page
        if (data.success) {
            // insert user into local storage, remove password
            const user = data.user;
            delete user.password;
            localStorage.setItem("user", JSON.stringify(user));

            window.location.href = "/profile";
        } else {
            // register failed
            toastr.error("Failed to register");
        }
    };

    return (<>
        <div style={{
            backgroundColor: "#000000",
            height: "100vh",
        }} className="pt-5">
            <div className="container pt-5">
                <div className="row">
                    <div className="col-md-6 pt-4">
                        <div className="card p-5 m-3 m-md-5 rounded-lg h-100">
                            <h1>Log In</h1>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={handleLogin}>Log In</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6 pt-4">
                        <div className="card p-5 m-3 m-md-5 rounded-lg h-100">
                            <h1>Sign Up</h1>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="regName">Name</label>
                                    <input type="text" className="form-control" id="regName" placeholder="Name" onChange={e => setRegName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="regEmail">Email</label>
                                    <input type="email" className="form-control" id="regEmail" placeholder="Email" onChange={e => setRegEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={e => setRegPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={handleRegister}>Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Login;