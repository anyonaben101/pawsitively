function Footer() {
    return (<>
        <footer style={{
            backgroundColor: "#1c1917",
        }} className="footer py-4 fixed-bottom text-light">
            <div className="text-center">
                <p>Copyright {new Date().getFullYear()}. All rights reserved</p>
            </div>
        </footer>

    </>);
}

export default Footer;