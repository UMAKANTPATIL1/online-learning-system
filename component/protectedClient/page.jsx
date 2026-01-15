"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function ProtectedClient({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token") || Cookies.get("token");

    if (!token) {
      router.replace("/?showLogin=true");
    }
    else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return children;
}
