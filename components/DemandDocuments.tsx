import { Demand } from "@/types";
import Image from "next/image";
import React from "react";

export default function DemandDocuments({ demand }: { demand: Demand }) {
  return (
    <div className="p-10 bg-white shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {!!demand.returnFlightTicketProof && (
          <div>
            <h3>Return Flight Ticket Proof:</h3>
            <Image
              width={350}
              height={350}
              alt="Return Flight Ticket Proof"
              src={demand.returnFlightTicketProof}
            />
          </div>
        )}
        {!!demand.passportProof && (
          <div>
            <h3>Passport proof:</h3>
            <Image
              width={350}
              height={350}
              alt="Passport proof"
              src={demand.passportProof}
            />
          </div>
        )}
        {!!demand.yellowFeverVaccinationProof && (
          <div>
            <h3>Yellow Fever Vaccination Proof:</h3>
            <Image
              width={350}
              height={350}
              alt="Yellow Fever Vaccination Proof"
              src={demand.yellowFeverVaccinationProof}
            />
          </div>
        )}
        {!!demand.invitationLetter && (
          <div>
            <h3>Invitation Letter:</h3>
            <Image
              width={350}
              height={350}
              alt="Invitation Letter"
              src={demand.invitationLetter}
            />
          </div>
        )}
        {!!demand.hotelBookingProof && (
          <div>
            <h3>Hotel Booking Proof:</h3>
            <Image
              width={350}
              height={350}
              alt="Hotel Booking Proof"
              src={demand.hotelBookingProof}
            />
          </div>
        )}
        {!!demand.passportSizePhoto && (
          <div>
            <h3>Passport Size Photo:</h3>
            <Image
              width={350}
              height={350}
              alt="passportSizePhoto"
              src={demand.passportSizePhoto}
            />
          </div>
        )}
      </div>
    </div>
  );
}
