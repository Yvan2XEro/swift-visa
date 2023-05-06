import { useDemandForm } from "@/contexts/demand-form";
import DemandFormButtons from "../DemandFormButtons";
import DemandFormWrapper from "../DemandFormWrapper";
import countries from "@/data/countries.json";
import { Input } from "@nextui-org/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Demand } from "@/types";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const shema = yup.object().shape({
  passportIssueCountry: yup.string().required(),
  numDocument: yup
    .string()
    .required()
    .min(6)
    .matches(/^[a-zA-Z0-9]+$/, "Only alphanumeric characters are allowed"),
  passportExpireDate: yup.string().required(),
  passportIssueDate: yup.string().required(),
});
export function PassportForm() {
  const router = useRouter();
  const { formValues, setFormValues } = useDemandForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Partial<Demand & { emailVerif: string }>>({
    resolver: yupResolver(shema),
    values: formValues,
    mode: "onChange",
  });
  async function submit(data: Partial<Demand>) {
    setFormValues(data);

    try {
      const response = await fetch(`/api/demands/${formValues.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formValues, id: undefined }),
      });
      if (response.ok) {
        router.push(`/demands/${formValues.id}/payment`);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <DemandFormWrapper>
        <label className="my-2">
          <span className="text-sm block mb-1">Country of issue :</span>
          <select {...register("passportIssueCountry")}>
            <option>select...</option>
            {countries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        {!!errors.passportIssueCountry && (
          <small className="text-red-600">
            {errors.passportIssueCountry.message}
          </small>
        )}
        <Input required {...register("numDocument")} label="Passport number" />
        {!!errors.numDocument && (
          <small className="text-red-600">{errors.numDocument.message}</small>
        )}
        <Input
          required
          {...register("passportIssueDate")}
          label="Date of issue of the passpor"
          type="date"
        />
        {!!errors.passportIssueDate && (
          <small className="text-red-600">
            {errors.passportIssueDate.message}
          </small>
        )}
        <Input
          required
          {...register("passportExpireDate")}
          label="Passport expiry date"
          type="date"
        />
        {!!errors.passportExpireDate && (
          <small className="text-red-600">
            {errors.passportExpireDate.message}
          </small>
        )}
      </DemandFormWrapper>
      <DemandFormButtons />
    </form>
  );
}
