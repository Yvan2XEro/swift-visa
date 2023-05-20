"use client";

import { Demand } from "@/types";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React, { useMemo, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const s =
  "https://firebasestorage.googleapis.com/v0/b/agro-app-6f98c.appspot.com/o/images%2Ff67826f8-d409-424d-8718-19f962b99147Cover.jpg?alt=media&token=0436faa1-d4f0-4155-a5f1-77c5624d9d40";

export default function DownloadButton({ demand }: { demand: Demand }) {
  const docRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => docRef.current,
  });

  const validity = useMemo(() => {
    const beginDate = new Date(demand.updatedAt + "");
    const endDate = new Date(demand.updatedAt + "");

    endDate.setDate(beginDate.getDate() + demand.duration);
    return {
      beginDate: beginDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
    };
  }, [demand.updatedAt]);
  return (
    <div>
      <div className="text-center">
        <Button onClick={() => handlePrint()}>Download</Button>
      </div>
      <div
        ref={docRef}
        className="bg-gray-100 h-[302.36220472px] w-[453.54330709px] relative text-sm"
      >
        <div className="flex items-center bg-gradient-to-r  justify-between p-1 px-2 from-green-400 via-red-400 to-yellow-400">
          <div className="flex flex-col">
            <p>REPUBLIQUE DU CAMEROUN</p>
            <p>REPUBLIC OF CAMEROON</p>
          </div>
          <h2>VISA</h2>
          <p>4567</p>
        </div>
        <div className="bg-gray-100 ">
          <div className="flex gap-2 my-2">
            <Image
              alt="4x4"
              src={demand.passportSizePhoto || s}
              className="h-[170.07874016px] w-[132.28346457px]"
              height={170.07874016}
              width={132.28346457}
            />
            <div className="flex-auto">
              <div className="flex items-center">
                <div className="flex flex-col">
                  <strong className="text-xs font-semibold">
                    Nom et prénoms
                  </strong>
                  <small>
                    <em>Name and surname</em>
                  </small>
                </div>
                <p>
                  {demand.firstName} {demand.lastName}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <strong className="text-xs font-semibold">
                      Date Naissance
                    </strong>
                    <small>
                      <em>Date of birth</em>
                    </small>
                    <strong className=" font-black">{demand.birthDate}</strong>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <strong className="text-xs font-semibold">Sexe</strong>
                    <small>
                      <em>Sex</em>
                    </small>
                    <strong className=" font-black">
                      {demand.gender?.toLocaleLowerCase().startsWith("m")
                        ? "M"
                        : "F"}
                    </strong>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <strong className="text-xs font-semibold">
                      Nationalité
                    </strong>
                    <small>
                      <em>Nationality</em>
                    </small>
                    <strong className=" font-black">
                      {demand.nationality}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <strong className="text-xs font-semibold">
                      Durée du séjour
                    </strong>
                    <small>
                      <em>Duration of stay</em>
                    </small>
                    <strong className=" font-black">
                      {demand.duration || 30} Jours
                    </strong>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <strong className="text-xs font-semibold">Validité</strong>
                    <small>
                      <em>Validity</em>
                    </small>
                    <div className="flex justify-between gap-3">
                      <strong className=" font-black">
                        {validity.beginDate}
                      </strong>
                      <strong className=" font-black">-</strong>

                      <strong className=" font-black">
                        {validity.endDate}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <strong className="text-xs font-semibold">Motif</strong>
                    <small>
                      <em>Purpose</em>
                    </small>
                    <strong className=" font-black">{demand.tripReason}</strong>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <strong className="text-xs font-semibold">
                      Nbre entrées
                    </strong>
                    <small>
                      <em>Number of entries</em>
                    </small>
                    <div className="flex justify-between gap-3">
                      <strong className=" font-black">
                        {demand.entryNumber}
                      </strong>
                      <strong className=" font-black">-</strong>

                      <strong className=" font-black">
                        {validity.endDate}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xl">
            {"<<<<< ,. .. .. <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"}
          </p>
          <p className="text-xl">
            {"344MF 34443247890967 <<<<<<<<<<<<<<<<<<<<<<<<<<"}
          </p>
        </div>
      </div>
    </div>
  );
}
