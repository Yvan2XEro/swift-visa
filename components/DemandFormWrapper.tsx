import { useDemandForm } from "@/contexts/demand-form";
import { Loading } from "@nextui-org/react";
import React, { PropsWithChildren, useState } from "react";

type FormProps = PropsWithChildren & {};
export default function DemandFormWrapper({ children }: FormProps) {
  const { formStepState } = useDemandForm();
  if (!formStepState) return <></>;
  const { currentStep } = formStepState;

  return (
    <>
      <div className=" flex flex-col items-center w-[21.438rem] h-auto pb-8  px-[1.625rem] pt-9 rounded-lg lg:w-[39.875rem]  lg:pt-12 lg:px-12">
        <div className=" flex flex-col gap-5 pb-7">
          <h1 className="text-3xl font-bold">{currentStep.title}</h1>
          <p className=" text-Coolgray">{currentStep.subtitle}</p>
        </div>

        <div className="flex flex-col gap-[1.125rem] w-full lg:px-12 ">
          <div className=" flex flex-col gap-1">{children}</div>
        </div>
      </div>
    </>
  );
}
