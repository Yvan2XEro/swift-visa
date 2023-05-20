import { useDemandForm } from "@/contexts/demand-form";
import React, { FormEvent, useState } from "react";
import DemandFormButtons from "../DemandFormButtons";
import DemandFormWrapper from "../DemandFormWrapper";
import { DemandFiles, DemandFilesErrors } from "@/types";
import { useRouter } from "next/navigation";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { uploadFileAndGetUrl } from "@/lib/functions/upload";

export function DocumentsForm() {
  const router = useRouter();

  const { formValues, setFormValues, formStepState } = useDemandForm();

  const [previews, setPreviews] = useState<DemandFiles>({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<DemandFilesErrors>({});

  async function handleFileChange(e: any) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = Math.round(file.size / 1024);
      if (fileSize > 2048) {
        setErrors((prev: any) => {
          prev[e.target.name] = "The image must have a size of 2MB at most.";
          return prev;
        });
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviews((prevPreviews) => ({
            ...prevPreviews,
            [e.target.name]: Object.assign(file, {
              preview: reader.result,
            }),
          }));
        };
        reader.readAsDataURL(file);
        setErrors((prev: any) => {
          prev[e.target.name] = undefined;
          return prev;
        });
      }
    }
  }

  function handleClear() {
    setPreviews({});
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (
      !!previews.passportProof &&
      !!previews.returnFlightTicketProof &&
      !!previews.yellowFeverVaccinationProof &&
      !!previews.invitationLetter &&
      !!previews.hotelBookingProof &&
      !!previews.passportSizePhoto
    ) {
      setLoading(true);
      const [
        passportProof,
        returnFlightTicketProof,
        yellowFeverVaccinationProof,
        invitationLetter,
        hotelBookingProof,
        passportSizePhoto,
      ] = await Promise.all([
        uploadFileAndGetUrl(previews.passportProof),
        uploadFileAndGetUrl(previews.returnFlightTicketProof),
        uploadFileAndGetUrl(previews.yellowFeverVaccinationProof),
        uploadFileAndGetUrl(previews.invitationLetter),
        uploadFileAndGetUrl(previews.hotelBookingProof),
        uploadFileAndGetUrl(previews.passportSizePhoto),
      ]);
      console.log(
        passportProof,
        returnFlightTicketProof,
        yellowFeverVaccinationProof,
        invitationLetter,
        hotelBookingProof,
        passportSizePhoto
      );
      try {
        const response = await fetch(`/api/demands/${formValues.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formValues,
            passportProof,
            returnFlightTicketProof,
            yellowFeverVaccinationProof,
            invitationLetter,
            hotelBookingProof,
            passportSizePhoto,
            id: undefined,
          }),
        });
        if (response.ok) {
          router.push(`/demands/${formValues.id}/payment`);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }
  return (
    <form onSubmit={submit}>
      <DemandFormWrapper>
        <IoMdCloseCircleOutline
          size={35}
          className="my-4 block ml-auto cursor-pointer text-red-500"
          onClick={handleClear}
          title="Clear files"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="cursor-pointer p-3">
              Your passport:
              <input
                className="hidden"
                accept="image/*"
                name="passportProof"
                type="file"
                required
                onChange={handleFileChange}
              />
              <div className="border border-dashed w-[85px] h-[85px] flex items-center justify-center">
                <img
                  alt="passportProof"
                  width={85}
                  height={85}
                  src={previews.passportProof?.preview || "/upload.svg"}
                  className=" max-w-[60px] max-h-[60px] overflow-hidden"
                />
              </div>
            </label>
            {errors.passportProof && <small>{errors.passportProof}</small>}
          </div>
          <div>
            <label className="cursor-pointer p-3">
              Return flight ticket:
              <input
                className="hidden"
                accept="image/*"
                name="returnFlightTicketProof"
                type="file"
                required
                onChange={handleFileChange}
              />
              <div className="border border-dashed w-[85px] h-[85px] flex items-center justify-center">
                <img
                  alt="returnFlightTicketProof"
                  width={85}
                  height={85}
                  src={
                    previews.returnFlightTicketProof?.preview || "/upload.svg"
                  }
                  className=" max-w-[60px] max-h-[60px] overflow-hidden"
                />
              </div>
            </label>
          </div>
          <div>
            <label className="cursor-pointer p-3">
              Yellow Fever Vaccination Proof:
              <input
                className="hidden"
                accept="image/*"
                name="yellowFeverVaccinationProof"
                type="file"
                required
                onChange={handleFileChange}
              />
              <div className="border border-dashed w-[85px] h-[85px] flex items-center justify-center">
                <img
                  alt="yellowFeverVaccinationProof"
                  width={85}
                  height={85}
                  src={
                    previews.yellowFeverVaccinationProof?.preview ||
                    "/upload.svg"
                  }
                  className=" max-w-[60px] max-h-[60px] overflow-hidden"
                />
              </div>
            </label>
          </div>
          <div>
            <label className="cursor-pointer p-3">
              Invitation Letter:
              <input
                className="hidden"
                accept="image/*"
                name="invitationLetter"
                type="file"
                required
                onChange={handleFileChange}
              />
              <div className="border border-dashed w-[85px] h-[85px] flex items-center justify-center">
                <img
                  alt="invitationLetter"
                  width={85}
                  height={85}
                  src={previews.invitationLetter?.preview || "/upload.svg"}
                  className=" max-w-[60px] max-h-[60px] overflow-hidden"
                />
              </div>
            </label>
          </div>
          <div>
            <label className="cursor-pointer p-3">
              Hotel Booking Proof:
              <input
                className="hidden"
                accept="image/*"
                name="hotelBookingProof"
                type="file"
                required
                onChange={handleFileChange}
              />
              <div className="border border-dashed w-[85px] h-[85px] flex items-center justify-center">
                <img
                  alt="hotelBookingProof"
                  width={85}
                  height={85}
                  src={previews.hotelBookingProof?.preview || "/upload.svg"}
                  className=" max-w-[60px] max-h-[60px] overflow-hidden"
                />
              </div>
            </label>
          </div>

          <div>
            <label className="cursor-pointer p-3">
              Passport Size Photo:
              <input
                className="hidden"
                accept="image/*"
                name="passportSizePhoto"
                type="file"
                required
                onChange={handleFileChange}
              />
              <div className="border border-dashed w-[85px] h-[85px] flex items-center justify-center">
                <img
                  alt="passportSizePhoto"
                  width={85}
                  height={85}
                  src={previews.passportSizePhoto?.preview || "/upload.svg"}
                  className=" max-w-[60px] max-h-[60px] overflow-hidden"
                />
              </div>
            </label>
          </div>
        </div>
      </DemandFormWrapper>
      <DemandFormButtons loading={loading} />
    </form>
  );
}
