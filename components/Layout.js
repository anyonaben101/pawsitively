import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
    return (<>
        <Head>
            <title>Pets Online</title>
            <meta name="description" content="A site for maintaining your pets and buying stuff" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header></Header>
        {children}
        <Footer></Footer>
    </>);
}

export default Layout;