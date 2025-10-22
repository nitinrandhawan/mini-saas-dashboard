"use client";

import "./globals.css";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster/>
        <Provider store={store}>
        <ProtectedRoute>
          
          {children}
        </ProtectedRoute>
          </Provider>
      </body>
    </html>
  );
}
