"use client";
import { Demand } from "@/types";
import { Card, Loading, Table } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page({ params: { id } }: { params: { id: string } }) {
  const [demand, setDemand] = useState<Demand>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

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
      <div className="flex">
        <table className="shadow-md p-3 flex-col min-w-[20rem] mx-auto my-2">
          <tr>
            <th className="text-left p-2">Last names:</th>
            <td>{demand?.lastName}</td>
          </tr>
          <tr>
            <th className="text-left p-2">First names:</th>
            <td>{demand?.firstName}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Gender:</th>
            <td>{demand?.gender}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Date of birth:</th>
            <td>{demand?.birthDate}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Place of Birth:</th>
            <td>{demand?.birthPlace}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Country of birth:</th>
            <td>{demand?.birthCountry}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Country of nationality:</th>
            <td>{demand?.nationality}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Profession:</th>
            <td>{demand?.profession}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Phone number:</th>
            <td>{demand?.phone1}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Phone number 2:</th>
            <td>{demand?.phone2}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Visa kind-Visa duration:</th>
            <td>{demand?.kindVisa}</td>
          </tr>
          <tr>
            <th className="text-left p-2">From an embassy:</th>
            <td>{demand?.fromEmbassy ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th className="text-left p-2">
              Date of previous stay in Cameroon:
            </th>
            <td>{demand?.previousStayDate}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Date of entry in Cameroon:</th>
            <td>{demand?.entryDate}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Residence address in Cameroon:</th>
            <td>{demand?.residence}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Duration stay in Cameroon (days):</th>
            <td>{demand?.duration}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Country of departure:</th>
            <td>{demand?.depCountry}</td>
          </tr>
          <tr>
            <th className="text-left p-2">
              Destination after leaving Cameroon:
            </th>
            <td>{demand?.destination}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Means of subsistence:</th>
            <td>{demand?.subsistenceMean}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Return guarantee:</th>
            <td>{demand?.returnGuarantee}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Reason for the trip:</th>
            <td>{demand?.tripReason}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Country of issue:</th>
            <td>{demand?.passportIssueCountry}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Passport number:</th>
            <td>{demand?.numDocument}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Date of issue of the passpor:</th>
            <td>{demand?.passportIssueDate}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Passport expiry date:</th>
            <td>{demand?.passportExpireDate}</td>
          </tr>
        </table>
        <div></div>
      </div>
    );
  }
  return (
    <main>
      <h1 className="text-4xl font-bold text-center mt-3">Pay now</h1>
      {renderContent()}
    </main>
  );
}
