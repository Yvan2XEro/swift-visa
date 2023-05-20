"use client";
import DemandToPrint from "@/components/DemandToPrint";
import { Demand } from "@/types";
import { Button, Card, Input, Loading, Modal, Table } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import OmMomo from "@/assets/images/om-momo.jpg";
import { wait } from "@/lib/functions/wait";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const docRef = useRef<any>();
  const [demand, setDemand] = useState<Demand>();
  const [loading, setLoading] = useState(true);
  const [paymentModale, setPaymentModale] = useState({
    open: false,
    pending: false,
    demand,
  });

  const handlePrint = useReactToPrint({
    content: () => docRef.current,
  });
  useEffect(() => {
    (async () => {
      await refetch();
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
  function handlePaymentModal() {
    setPaymentModale((p) => ({ ...p, open: true }));
  }
  async function refetch() {
    setLoading(true);
    const response = await fetch("/api/demands/" + id);
    if (response.ok) {
      setDemand(await response.json());
    } else {
    }
    setLoading(false);
  }
  async function pay() {
    setPaymentModale((p) => ({ ...p, pending: true }));

    const response = await fetch("/api/demands/" + demand?.id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ ...demand, id: undefined, statut: "paid" }),
    });
    if (response.ok) {
      await refetch();
    }
    setPaymentModale((p) => ({ ...p, pending: false, open: false }));
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
          <Button
            disabled={demand?.statut === "paid"}
            onClick={handlePaymentModal}
            color="warning"
          >
            pay now ({demand?.price} XAF)
          </Button>
          <Button onClick={handlePrint}>PRINT</Button>
        </div>
      </div>
      <div></div>
      {renderContent()}
      <Modal
        blur
        open={paymentModale.open}
        onClose={() => setPaymentModale((p) => ({ ...p, open: false }))}
      >
        <Modal.Header>
          <h1 className="text-xl">
            PROCESS PAYMENT {`${demand?.price} (XAF)`}
          </h1>
        </Modal.Header>
        <Modal.Body>
          <Input type="tel" label="Phone (MTN)" />
        </Modal.Body>
        <Modal.Footer>
          {paymentModale.pending && <Loading color="error" />}

          <Button onClick={pay} disabled={paymentModale.pending}>
            {paymentModale.pending ? "*126*14#" : "Validate"}
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}
