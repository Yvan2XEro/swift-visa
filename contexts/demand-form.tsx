import React, { useEffect, useState } from "react";
import { PropsWithChildren, createContext, useContext } from "react";
import DemandFormWrapper from "@/components/DemandFormWrapper";
import { Dropdown, Input, Radio, Textarea } from "@nextui-org/react";
import { Demand, FormStep, FormStepState } from "@/types";
import useMultiSteps from "@/hooks/multi-steps";
import classNames from "classnames";
import countries from "@/data/countries.json";
import DemandFormButtons from "@/components/DemandFormButtons";
import { PersonalInfosForm2 } from "@/components/FormParts/PersonalInfosForm2";
import { PersonalInfosForm1 } from "@/components/FormParts/PersonalInfosForm1";
import { VisaForm } from "@/components/FormParts/VisaForm";
import { TravelForm1 } from "@/components/FormParts/TravelForm1";
import { TravelForm2 } from "@/components/FormParts/TravelForm2";
import { PassportForm } from "@/components/FormParts/PassportForm";
import { DocumentsForm } from "@/components/FormParts/DocumentsForm";

const initialValue = {
  formStepState: undefined as FormStepState | undefined,
  formValues: {} as Demand,
  setFormValues: (v: Partial<Demand>) => {},
  progressSteps: <></>,
};

const DemandFormContext = createContext(initialValue);

export function DemandFormProvider({ children }: PropsWithChildren) {
  const formStepState = useMultiSteps(steps);
  const [formValues, setFormValues] = useState<Demand>({} as Demand);

  function progressSteps() {
    return (
      <>
        {steps.map((step, index) => (
          <div className="lg:flex lg:items-center lg:gap-4">
            <p
              className={classNames("step_bull", {
                bull_active: index === formStepState.currentIndex,
              })}
            >
              {index + 1}
            </p>
            <div className="hidden lg:flex flex-col items-start justify-start">
              <p className=" text-blue-200  font-normal ">STEP {index + 1}</p>
              <p>{step.title}</p>
            </div>
          </div>
        ))}
      </>
    );
  }
  return (
    <DemandFormContext.Provider
      value={{
        formStepState,
        formValues,
        progressSteps: progressSteps(),
        setFormValues: (v) => setFormValues((prev) => ({ ...prev, ...v })),
      }}
    >
      {children}
    </DemandFormContext.Provider>
  );
}

const steps: FormStep[] = [
  {
    form: <PersonalInfosForm1 key={1} />,
    title: "Personal informations (1)",
  },
  {
    form: <PersonalInfosForm2 key={2} />,
    title: "Personal informations (2)",
  },
  {
    form: <VisaForm key={3} />,
    title: "Visa kind",
  },
  {
    form: <TravelForm1 key={4} />,
    title: "Travel informations (1)",
  },
  {
    form: <TravelForm2 key={5} />,
    title: "Travel informations (2)",
  },
  {
    form: <PassportForm key={6} />,
    title: "Passport informations",
  },
  {
    form: <DocumentsForm key={7} />,
    title: "Documents",
  },
];

export function useDemandForm() {
  return useContext(DemandFormContext);
}
