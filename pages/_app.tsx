import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const Nav = dynamic(() => import('remote/Nav'), { ssr: false });
const Footer = dynamic(() => import('remote/Footer'), { ssr: false });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div id="page-layout">
      <Nav />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
 
 
 
 
 
 