import { useDemandForm } from "@/contexts/demand-form";
import { Radio, Input } from "@nextui-org/react";
import React from "react";
import DemandFormButtons from "../DemandFormButtons";
import DemandFormWrapper from "../DemandFormWrapper";
import visasTypes from "@/data/visa-types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Demand } from "@/types";

const shema = yup.object().shape({
  kindVisa: yup
    .string()
    .min(3)
    .required()
    .matches(/^(?!select...).*$/, "This field is required!"),
  visaCategory: yup.string().required(),
  entryNumber: yup.string().required(),
  fromEmbassy: yup.boolean().required(),
});

export function VisaForm() {
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

  function submit(data: Partial<Demand>) {
    setFormValues({
      ...data,
      price: visasTypes.find((t) => t.type == data.kindVisa)?.price,
    });
    formStepState?.next();
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <DemandFormWrapper>
        <label className="my-2">
          <span className="text-sm block mb-1">Visa kind-Visa duration:</span>
          <select {...register("kindVisa")}>
            <option>select...</option>
            {visasTypes.map((c) => (
              <option key={c.type} value={c.type}>
                {c.type} ({c.price} XAF)
              </option>
            ))}
          </select>
        </label>
        {!!errors.kindVisa && (
          <small className="text-red-600">{errors.kindVisa.message}</small>
        )}
        <label className=" pl-[0.15rem] hover:cursor-pointer my-2 flex justify-between">
          Are you making your request from an embassy?
          <input
            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] checked:bg-red-400 bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            {...register("fromEmbassy")}
          />
        </label>
        {!!errors.fromEmbassy && (
          <small className="text-red-600">{errors.fromEmbassy.message}</small>
        )}
        <Radio.Group
          isRequired
          {...register("visaCategory")}
          value={formValues.visaCategory}
          onChange={(value) =>
            setFormValues({ ...getValues(), visaCategory: value })
          }
          label="Visa category:"
        >
          <Radio
            {...register("visaCategory")}
            value="temporary stay (3 months)"
            defaultChecked
          >
            Temporary stay (3 months)
          </Radio>
          <Radio {...register("visaCategory")} value="Long stay (6months)">
            Long stay (6months)
          </Radio>
        </Radio.Group>
        <Radio.Group
          isRequired
          {...register("entryNumber")}
          value={formValues.entryNumber}
          onChange={(value) =>
            setFormValues({ ...getValues(), entryNumber: value })
          }
          label="Entry type:"
        >
          <Radio {...register("entryNumber")} value="One entry" defaultChecked>
            One entry
          </Radio>
          <Radio {...register("entryNumber")} value="Multiple entries">
            Multiple entries
          </Radio>
        </Radio.Group>
        <DemandFormButtons />
      </DemandFormWrapper>
    </form>
  );
}
