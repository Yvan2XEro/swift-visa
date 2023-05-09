import { Demand } from "@/types";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import Cmr from "@/assets/images/cmr.jpeg";
import React from "react";

export default function DemandToPrint({ demand }: { demand: Demand }) {
  return (
    <div className="p-10 bg-white shadow-md">
      <div className="flex justify-between mb-4">
        <Image
          width={100}
          height={100}
          className="w-30 h-10"
          alt="Logo sv"
          src={Logo}
        />
        <Image width={100} height={100} alt="Logo cmr" src={Cmr} />
      </div>
      <div className="flex justify-center gap-3">
        <table>
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
            <th className="text-left p-2">Citizenship:</th>
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
        </table>
        <table>
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
      </div>
      <div>
        <h3>LEGAL NoTICE</h3>
        <ul className="list-decimal">
          <li>
            The e-visa printed online is only valid when printed and presented
            along with other required travel documents upon entry into the
            destination country. Please ensure to keep a printed copy of your
            e-visa throughout your travel.
          </li>
          <li>
            The e-visa is strictly intended for personal use. It cannot be
            resold, transferred, or used by anyone other than the e-visa holder.
            Any fraudulent use of the e-visa may result in legal consequences.
          </li>
        </ul>
        <p className="my-2 text-center">{process.env.HOST}</p>
      </div>
    </div>
  );
}
