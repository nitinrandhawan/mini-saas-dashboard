"use client";

import "./globals.css";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Toaster } from "react-hot-toast";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster/>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
