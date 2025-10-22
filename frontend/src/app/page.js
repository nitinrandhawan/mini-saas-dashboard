"use client";

import { verifyAuth } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
export default function Home() {
  const { loading } = useSelector((state) => state.user);
  
  const dispatch = useDispatch();
  const router = useRouter();
  const verifyAuthFunc = async () => {
    try {
      await dispatch(verifyAuth()).unwrap();
    } catch (error) {
      console.log("User not authenticated");
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    verifyAuthFunc();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Count:</h1>
      <button className="bg-blue-500 text-white px-4 py-2 mr-2 rounded">
        +
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded">-</button>
    </div>
  );
}
