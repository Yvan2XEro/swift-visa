"use client";
import DemandToPrint from "@/components/DemandToPrint";
import { Demand } from "@/types";
import { Button, Card, Loading, Table } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const docRef = useRef<any>();
  const [demand, setDemand] = useState<Demand>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const handlePrint = useReactToPrint({
    content: () => docRef.current,
  });
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/demands/" + id);
      if (response.ok) {
        setDemand(await response.json());
      } else {
      }
      setLoading(false);
    })();
  }, [id]);

  function renderContent() {
    if (loading)
      return (
        <div className="flex items-center justify-center">
          <Loading className="mx-auto text-center" color={"error"} />
        </div>
      );
    if (demand === undefined) return <>error</>;
    return (
      <div ref={docRef}>
        <DemandToPrint demand={demand} />
      </div>
    );
  }
  return (
    <main>
      <h1 className="text-4xl font-bold text-center mt-3">Your demand</h1>
      <Button onClick={handlePrint}>PRINT</Button>
      {renderContent()}
    </main>
  );
}
