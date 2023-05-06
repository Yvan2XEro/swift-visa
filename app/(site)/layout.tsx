"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PropsWithChildren } from "react";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "SWIFT VISA Cameroun",
};

export default function layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <div className="min-h-[101vh] md:min-h-[80vh]">{children}</div>
      <Footer />
    </>
  );
}
