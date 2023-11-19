import { Inter } from "next/font/google";
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
      <body className="bg-gray-900">
        <Provider>
          <Nav />

          {children}
        </Provider>
      </body>
    </html>
  );
}
