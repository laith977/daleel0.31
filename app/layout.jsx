import { Inter } from "next/font/google";
import Head from "next/head";
import "@/public/css/globals.css";
import Nav from "@/components/Navbar";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Daleel Al Hurra",
  description: "Daleel Al Hurra",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="
            worker-src blob:; 
            child-src blob: gap:;
            img-src 'self' blob: data:;
            default-src * 'self' 'unsafe-inline' 'unsafe-eval' data: gap: content:"
        />
      </Head>
      <body className="bg-gray-900">
        <Provider>
          <Nav />
          {children}
        </Provider>
      </body>
    </html>
  );
}
