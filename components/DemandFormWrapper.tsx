import { useDemandForm } from "@/contexts/demand-form";
import { Loading } from "@nextui-org/react";
import React, { PropsWithChildren, useState } from "react";

type FormProps = PropsWithChildren & {};
export default function DemandFormWrapper({ children }: FormProps) {
  const { formStepState, formValues } = useDemandForm();
  if (!formStepState) return <></>;
  const { back, goTo, isFirst, isLast, next, currentStep } = formStepState;
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!isLast) return next();
    setLoading(true);
    const response = await fetch(`/api/demands/${formValues.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formValues, id: undefined }),
    });
    setLoading(false)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className=" flex flex-col items-center w-[21.438rem] h-auto pb-8  px-[1.625rem] pt-9 rounded-lg lg:w-[39.875rem]  lg:pt-12 lg:px-12">
        <div className=" flex flex-col gap-5 pb-7">
          <h1 className="text-3xl font-bold">{currentStep.title}</h1>
          <p className=" text-Coolgray">{currentStep.subtitle}</p>
        </div>

        <div className="flex flex-col gap-[1.125rem] w-full lg:px-12 ">
          <div className=" flex flex-col gap-1">{children}</div>
        </div>
      </div>
      <div className="w-full px-4 flex items-center gap-3 justify-end lg:relative lg:px-0 lg:w-full py-3">
        {loading ? (
          <Loading className="mx-auto" color={"error"} />
        ) : (
          <>
            {!isFirst && (
              <button
                type="button"
                className="font-bold border border-red-500  h-10 w-24 text-red-500 flex items-center justify-center  rounded-full  duration-300 lg:mr-24 "
                onClick={back}
              >
                PREV
              </button>
            )}
            {isLast && (
              <button
                type="button"
                className="font-bold border border-blue-500  h-10 w-24 text-blue-500 flex items-center justify-center  rounded-full  duration-300 lg:mr-24 "
                onClick={() => goTo(0)}
              >
                VERIFY
              </button>
            )}
            {!isLast ? (
              <button
                className="font-bold bg-red-500 h-10 w-24 text-white  rounded-full  duration-300 lg:mr-24 "
                // onClick={next}
                type="submit"
              >
                NEXT
              </button>
            ) : (
              <button
                className="font-bold bg-red-500 h-10 w-24 text-white  rounded-full  duration-300 lg:mr-24 "
                // onClick={next}
                type="submit"
              >
                SUBMIT
              </button>
            )}
          </>
        )}
      </div>
    </form>
  );
}
