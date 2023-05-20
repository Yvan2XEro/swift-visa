"use client";
import DemandForm from "@/components/DemandForm";
import { DemandFormProvider } from "@/contexts/demand-form";
import React, { useEffect, useState } from "react";

export default function page({
  params: { id, token },
}: {
  params: { id: string; token: string };
}) {
  return (
    <main>
      <div className="lg:bg-Magnolia lg:flex lg:flex-col lg:items-center lg:justify-center my-3">
        <DemandFormProvider>
          <DemandForm id={id} token={token} />
        </DemandFormProvider>
      </div>
    </main>
  );
}
