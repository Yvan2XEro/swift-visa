import DemandList from "@/components/DemandList";
import { Demand } from "@/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getServerSession();
  //   if (session) redirect("/login");
  return <main>{<DemandList />}</main>;
}
