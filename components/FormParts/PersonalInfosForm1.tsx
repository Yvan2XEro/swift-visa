import { useDemandForm } from "@/contexts/demand-form";
import { Input, Radio } from "@nextui-org/react";
import DemandFormButtons from "../DemandFormButtons";
import DemandFormWrapper from "../DemandFormWrapper";
import countries from "@/data/countries.json";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Demand } from "@/types";
import { useEffect } from "react";

const shema = yup.object().shape({
  firstName: yup.string().min(3).required(),
  lastName: yup.string().min(3).required(),
  gender: yup.string().required(),
  birthDate: yup.string().required(),
  cniNumber: yup
    .string()
    .required()
    .min(5)
    .matches(/^[0-9]+$/, "Must be valid!"),
  birthPlace: yup.string().required(),
});

export function PersonalInfosForm1() {
  const { formValues, setFormValues, formStepState } = useDemandForm();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<Partial<Demand & { emailVerif: string }>>({
    resolver: yupResolver(shema),
    values: formValues,
    mode: "onChange",
  });

  useEffect(() => console.log(errors), [errors]);

  function submit(data: Partial<Demand>) {
    setFormValues(data);
    formStepState?.next();
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <DemandFormWrapper>
        <Input required {...register("lastName")} label="Last names:" />
        {!!errors.lastName && (
          <small className="text-red-600">{errors.lastName.message}</small>
        )}
        <Input required {...register("firstName")} label="First names:" />
        {!!errors.firstName && (
          <small className="text-red-600">{errors.firstName.message}</small>
        )}
        <Radio.Group
          isRequired
          {...register("gender")}
          onChange={(value) => setFormValues({ ...getValues(), gender: value })}
          label="Gender:"
        >
          <Radio {...register("gender")} value="Male">
            Male
          </Radio>
          <Radio {...register("gender")} value="Female">
            Female
          </Radio>
        </Radio.Group>

        <Input
          required
          {...register("birthDate")}
          type="date"
          label="Date of birth:"
        />
        {!!errors.birthDate && (
          <small className="text-red-600">{errors.birthDate.message}</small>
        )}
        <Input required {...register("birthPlace")} label="Place of Birth:" />
        {!!errors.birthPlace && (
          <small className="text-red-600">{errors.birthPlace.message}</small>
        )}

        <Input
          required
          {...register("cniNumber")}
          label="Identity Card number:"
        />
        {!!errors.cniNumber && (
          <small className="text-red-600">{errors.cniNumber.message}</small>
        )}

        <DemandFormButtons />
      </DemandFormWrapper>
    </form>
  );
}
