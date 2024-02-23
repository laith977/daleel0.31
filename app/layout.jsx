import { Inter } from "next/font/google";
import "@/public/css/globals.css";
import Nav from "@/components/Navbar";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "دليل الحرة",
  description: "دليل الحرة",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta
        httpEquiv="Content-Security-Policy"
        content="default-src *;img-src * 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src  'self' 'unsafe-inline' *"
      />
      <link rel="icon" href="/favicon.ico" sizes="any" />

      <body className="bg-gray-900">
        <Provider>
          <Nav />
          {children}
        </Provider>
      </body>
    </html>
  );
}
