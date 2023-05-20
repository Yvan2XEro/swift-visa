import { Input } from "@nextui-org/react";
import DemandFormButtons from "../DemandFormButtons";
import DemandFormWrapper from "../DemandFormWrapper";
import { useDemandForm } from "@/contexts/demand-form";
import countries from "@/data/countries.json";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Demand } from "@/types";

const shema = yup.object().shape({
  nationality: yup.string().min(3).required(),
  profession: yup.string().min(3).required(),
  phone2: yup.string(),
  phone1: yup.string(),
  birthCountry: yup.string().required(),
});

export function PersonalInfosForm2() {
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
    console.log(data);
    formStepState?.next();
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <DemandFormWrapper>
        <label className="my-2">
          <span className="text-sm block mb-1">Citizenship:</span>
          <select {...register("nationality")}>
            <option>select...</option>
            {countries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        {!!errors.nationality && (
          <small className="text-red-600">{errors.nationality.message}</small>
        )}
        <Input required {...register("profession")} label="Profession:" />
        {!!errors.profession && (
          <small className="text-red-600">{errors.profession.message}</small>
        )}
        <Input
          required
          {...register("phone1")}
          label="Phone number:"
          type="tel"
        />
        {!!errors.phone1 && (
          <small className="text-red-600">{errors.phone1.message}</small>
        )}
        <Input {...register("phone2")} label="Phone number 2 (Optional):" />
        {!!errors.phone2 && (
          <small className="text-red-600">{errors.phone2.message}</small>
        )}
        <Input required {...register("homeAddress")} label="Home address:" />
        {!!errors.homeAddress && (
          <small className="text-red-600">{errors.homeAddress.message}</small>
        )}
        <label className="my-2">
          <span className="text-sm block mb-1">Country of birth:</span>
          <select {...register("birthCountry")}>
            <option>select...</option>
            {[{ name: "Cameroon" }, ...countries].map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          {!!errors.birthCountry && (
            <small className="text-red-600">
              {errors.birthCountry.message}
            </small>
          )}
        </label>
        <DemandFormButtons />
      </DemandFormWrapper>
    </form>
  );
}
