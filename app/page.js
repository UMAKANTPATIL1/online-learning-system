"use client";

import HomePage from "@/component/HomePage/page";
import DashboardRedirection from "@/component/DashboardRedirection/page";
import { Suspense } from "react";
import { Footer } from "@/component/footer/page";


export default function Home() {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardRedirection>
          <HomePage />
        </DashboardRedirection>
      </Suspense>
    </>
  );
}
