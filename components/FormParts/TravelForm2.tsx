import { useDemandForm } from "@/contexts/demand-form";
import { Textarea } from "@nextui-org/react";
import DemandFormButtons from "../DemandFormButtons";
import DemandFormWrapper from "../DemandFormWrapper";
import countries from "@/data/countries.json";
import cmrCities from "@/data/cmr-cities.json";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Demand } from "@/types";

const shema = yup.object().shape({
  destination: yup.string().min(3).required(),
  returnGuarantee: yup.string().min(6).required(),
  subsistenceMean: yup.string().min(6).required(),
  tripReason: yup.string().required(),
});
export function TravelForm2() {
  const { formValues, setFormValues, formStepState } = useDemandForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Partial<Demand & { emailVerif: string }>>({
    resolver: yupResolver(shema),
    values: formValues,
    mode: "onChange",
  });

  function submit(data: Partial<Demand>) {
    setFormValues(data);
    formStepState?.next();
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <DemandFormWrapper>
        <label className="my-2">
          <span className="text-sm block mb-1">
            Destination after leaving Cameroon:
          </span>
          <select {...register("destination")}>
            <option value="">select...</option>
            {countries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        {!!errors.destination && (
          <small className="text-red-600">{errors.destination.message}</small>
        )}
        <Textarea
          {...register("subsistenceMean")}
          label="Means of subsistence"
        />
        {!!errors.subsistenceMean && (
          <small className="text-red-600">
            {errors.subsistenceMean.message}
          </small>
        )}
        <Textarea {...register("returnGuarantee")} label="Return guarantee" />
        {!!errors.returnGuarantee && (
          <small className="text-red-600">
            {errors.returnGuarantee.message}
          </small>
        )}

        <label className="my-2">
          <span className="text-sm block mb-1">Reason for the trip:</span>
          <select {...register("tripReason")}>
            <option>select...</option>
            {tripReasons.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        {!!errors.tripReason && (
          <small className="text-red-600">{errors.tripReason.message}</small>
        )}
        <DemandFormButtons />
      </DemandFormWrapper>
    </form>
  );
}

const tripReasons = [
  "Business",
  "Tourism",
  "Health",
  "School",
  "Transit",
  "Official",
  "visit",
  "Internship",
  "Conference",
  "Mortal",
  "remains",
  "Colloques",
];
