"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function DashboardRedirection({ children }) {

    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("token") || Cookies.get("token");
        if (token) {
            toast.success("You are already logged in");
            router.replace(`/dashboard`);

        }
    }, [router]);
    return children;

}