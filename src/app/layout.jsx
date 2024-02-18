import "./../styles/globals.css";
import Footer from "@/components/Footer/Footer";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import Providers from "./Providers";
import { ShopContextProvider } from "@/context/shopContext";

export const metadata = {
  metadataBase: "https://.torshoshirin.com",
  title: "فروشگاه ترش و شیرین",
  description: "فروشگاه ترش و شیرین میوه و تره بار",
  openGraph: {
    title: "فروشگاه ترش و شیرین",
    description: "فروشگاه ترش و شیرین میوه و تره بار",
    url: "/files/react-img",
    images: ["/logo.png"],
    type: "website",
  },
  icons: {
    icon: "./icon.png",
  },
};

const iransans = localFont({
  src: [
    {
      path: "./../../public/assets/fonts/IRANSans/fonts/woff2/IRANSansWeb(FaNum).woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./../../public/assets/fonts/IRANSans/fonts/woff2/IRANSansWeb(FaNum)_Bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className={`min-h-screen ${iransans.className}`}>
        <Providers>
          <ShopContextProvider>
            <Toaster />
            <Navbar />

            {children}

            <div className="flex justify-center py-5">
              <Link href="/">
                <Image
                  src="https://admin.torshoshirin.com/files/react-img/logo.png"
                  width={240}
                  height={160}
                  alt="logo"
                />
              </Link>
            </div>
            <Footer />
          </ShopContextProvider>
        </Providers>
      </body>
    </html>
  );
}
