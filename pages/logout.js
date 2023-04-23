import { useEffect } from "react";

function logout() {
    useEffect(() => {
        // remove user from local storage to log user out
        localStorage.removeItem("user");

        // redirect to login page
        window.location.href = "/login";
    }, []);

    return <></>;
}

export default logout;