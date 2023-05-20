"use client";
import Navbar from "@/components/Navbar";
import { PropsWithChildren } from "react";
import { Metadata } from "next";

export default function layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <div className="min-h-[101vh] md:min-h-[80vh]">{children}</div>
    </>
  );
}
