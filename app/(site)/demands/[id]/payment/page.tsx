"use client";
import DemandToPrint from "@/components/DemandToPrint";
import { Demand } from "@/types";
import { Button, Card, Loading, Table } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import OmMomo from "@/assets/images/om-momo.jpg";

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
      <div className="flex justify-center gap-2">
        <Image
          width={160}
          height={65}
          alt="OM-MOMO"
          src={OmMomo}
          className="text-center max-h-[85px]"
        />
        <div className="flex flex-col gap-3 justify-between">
          <Button color="warning">pay now ({demand?.price} XAF)</Button>
          <Button onClick={handlePrint}>PRINT</Button>
        </div>
      </div>
      <div></div>
      {renderContent()}
    </main>
  );
}
