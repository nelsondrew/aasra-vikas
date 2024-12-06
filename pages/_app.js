import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { useEffect } from "react";
import Layout from "../components/layout";
import "../styles/globals.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css'; // Import Line Awesome styles



export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  if (Component.getLayout) {
    return Component.getLayout(
      <>
        <Head>
          <title>Aasra Vikas</title>
          <meta name="description" content="Micro loans for financial Freedom" />
          <link rel="icon" href="av_favicon.ico" />
        </Head>
        <Component {...pageProps} />
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Aasra Vikas</title>
        <meta name="description" content="Micro loans for financial Freedom" />
        <link rel="icon" href="av_favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
