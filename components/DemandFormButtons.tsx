import { useDemandForm } from "@/contexts/demand-form";
import { Loading } from "@nextui-org/react";
import React from "react";

export default function DemandFormButtons({ loading }: { loading?: boolean }) {
  const { formStepState } = useDemandForm();
  if (!formStepState) return <></>;

  const { back, goTo, isFirst, isLast } = formStepState;

  return (
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
              type="submit"
            >
              NEXT
            </button>
          ) : (
            <button
              className="font-bold bg-red-500 h-10 w-24 text-white  rounded-full  duration-300 lg:mr-24 "
              type="submit"
            >
              SUBMIT
            </button>
          )}
        </>
      )}
    </div>
  );
}
