import { useDemandForm } from "@/contexts/demand-form";
import DemandFormButtons from "../DemandFormButtons";
import DemandFormWrapper from "../DemandFormWrapper";
import { Input } from "@nextui-org/react";
import countries from "@/data/countries.json";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Demand } from "@/types";

const shema = yup.object().shape({
  previousStayDate: yup.string().required(),
  entryDate: yup.string().required(),
  duration: yup.number().min(1).required(),
  depCountry: yup.string().required(),
  residence: yup.string().required(),
});

export function TravelForm1() {
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
        <Input
          required
          type="date"
          {...register("previousStayDate")}
          label="Date of previous stay in Cameroon (if applicable):"
        />
        {!!errors.previousStayDate && (
          <small className="text-red-600">
            {errors.previousStayDate.message}
          </small>
        )}
        <Input
          required
          {...register("entryDate")}
          type="date"
          label="Date of entry in Cameroon:"
        />
        {!!errors.entryDate && (
          <small className="text-red-600">{errors.entryDate.message}</small>
        )}
        <Input
          required
          {...register("residence")}
          label="Residence address in Cameroon:"
        />
        {!!errors.residence && (
          <small className="text-red-600">{errors.residence.message}</small>
        )}
        <Input
          required
          {...register("duration")}
          label="Duration stay in Cameroon (days):"
          type="number"
          min={1}
        />
        {!!errors.duration && (
          <small className="text-red-600">{errors.duration.message}</small>
        )}
        <label className="my-2">
          <span className="text-sm block mb-1">Country of departure:</span>
          <select {...register("depCountry")}>
            <option>select...</option>
            {countries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        {!!errors.depCountry && (
          <small className="text-red-600">{errors.depCountry.message}</small>
        )}
        <DemandFormButtons />
      </DemandFormWrapper>
    </form>
  );
}
