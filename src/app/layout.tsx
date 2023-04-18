import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AppBar from "./components/AppBar";
import GlobalContextProvider from "./Context/store";
import { FC } from "react";

export const metadata = {
  title: "Marketplace",
  description:
    "Shop the latest trends in fashion, beauty, and home decor at our Marketplace e-commerce store. Discover affordable, high-quality products for men, women, and kids, with fast and reliable shipping. Browse our extensive collection today and find exactly what you're looking for!",
  icons: {
    icon: "favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <GlobalContextProvider>
          <AppBar />
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  );
}
