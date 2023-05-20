import DownloadButton from "@/components/DownloadButton";
import { findDemand } from "@/lib/prisma/demands";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const { demand, error } = await findDemand(id);
  if (!!error || !demand) notFound();

  if (demand.statut !== "available")
    return (
      <main>
        <p>Not available!</p>
      </main>
    );
  return (
    <main>
      <h2>Congratulations!</h2>
      <p>Your visa application for Cameroon has been approved</p>
      <DownloadButton demand={demand} />
    </main>
  );
}
