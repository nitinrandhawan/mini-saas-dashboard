"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { verifyAuth } from "@/store/slices/userSlice";

export default function ProtectedRoute({ children }) {
  const { loading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(verifyAuth()).unwrap();
        router.push("/leads")
      } catch (error) {
        router.push("/auth/login"); 
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (loading || checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
