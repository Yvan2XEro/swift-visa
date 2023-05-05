import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDemandForm } from "@/contexts/demand-form";

export default function DemandForm({
  id,
  token,
}: {
  id: string;
  token: string;
}) {
  const { formStepState, progressSteps, setFormValues } = useDemandForm();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/demands/${id}`);
      if (response.ok) {
        setFormValues({ ...(await response.json()) });
      }
    })();
  }, [id]);
  const [idFromToken, setidFromToken] = useState<any>();
  useEffect(() => {
    (async () => {
      console.log(id, token);
      const response = await fetch(`/api/demand-id/${token}`);
      if (response.ok) {
        return setidFromToken((await response.json()).id);
      }
      setidFromToken(null);
    })();
  }, [token, id]);

  if (idFromToken === undefined) return <></>;
  if (idFromToken != id)
    return (
      <main>
        <p className="text-red-700 p-1 bg-red-200 text-center">Invalid link!</p>
      </main>
    );
  const page: number = 0;
  return (
    <div className="lg:flex lg:flex-col lg:items-center lg:justify-center">
      <div className=" w-full lg:flex lg:flex-row lg:justify-center lg:items-center lg:shadow-2xl">
        <div className="text-white  flex flex-row justify-center pt-8 gap-4 relative bg-mobileBg bg-cover bg-no-repeat h-full w-full  font-medium lg:bg-desktopBg lg:min-h-[30.438rem] lg:min-w-[17.063rem] lg:flex-col lg:justify-start lg:pt-10 lg:pl-8">
          {progressSteps}
        </div>
        <div className="text-base absolute translate-y-[-2rem] w-full min-h-[100vh] md:min-h-[43.438rem] flex flex-col items-center lg:relative lg:translate-y-0 lg:h-full">
          {formStepState?.currentStep.form}
        </div>
      </div>
    </div>
  );
}
