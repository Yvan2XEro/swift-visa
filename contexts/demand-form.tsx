import React, { useEffect, useState } from "react";
import { PropsWithChildren, createContext, useContext } from "react";
import DemandFormWrapper from "@/components/DemandFormWrapper";
import { Dropdown, Input, Radio, Textarea } from "@nextui-org/react";
import { Demand, FormStep, FormStepState } from "@/types";
import useMultiSteps from "@/hooks/multi-steps";
import classNames from "classnames";
import cmrCities from "@/data/cmr-cities.json";
import countries from "@/data/countries.json";

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
  useEffect(() => {
    console.log("OOOOOOO", formValues);
  }, [formValues]);
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
];

export function useDemandForm() {
  return useContext(DemandFormContext);
}

function PersonalInfosForm1() {
  const {
    formValues: {
      firstName,
      lastName,
      gender,
      birthDate,
      birthCountry,
      birthPlace,
    },
    setFormValues,
  } = useDemandForm();
  return (
    <DemandFormWrapper>
      <Input
        required
        value={lastName}
        onChange={({ target }) => setFormValues({ lastName: target.value })}
        label="Last names:"
      />
      <Input
        required
        value={firstName}
        onChange={({ target }) => setFormValues({ firstName: target.value })}
        label="First names:"
      />
      <Radio.Group
        value={gender?.length > 1 ? gender : undefined}
        isRequired
        onChange={(value) => setFormValues({ gender: value })}
        label="Gender:"
      >
        <Radio value="Male">Male</Radio>
        <Radio value="Female">Female</Radio>
      </Radio.Group>
      <Input
        required
        value={birthDate}
        onChange={({ target }) => setFormValues({ birthDate: target.value })}
        type="date"
        label="Date of birth:"
      />
      <Input
        required
        value={birthPlace}
        onChange={({ target }) => setFormValues({ birthPlace: target.value })}
        label="Place of Birth"
      />
      <label className="my-2">
        <span className="text-sm block mb-1">Country of birth:</span>
        <select
          value={birthCountry}
          onChange={({ target }) =>
            setFormValues({ birthCountry: target.value })
          }
        >
          <option>select...</option>
          {countries.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
    </DemandFormWrapper>
  );
}

function PersonalInfosForm2() {
  const {
    formValues: { nationality, profession, phone1, phone2, homeAddress },
    setFormValues,
  } = useDemandForm();
  return (
    <DemandFormWrapper>
      <label className="my-2">
        <span className="text-sm block mb-1">Country of nationality:</span>
        <select
          value={nationality}
          onChange={({ target }) =>
            setFormValues({ nationality: target.value })
          }
        >
          <option>select...</option>
          {countries.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      <Input
        required
        value={profession}
        onChange={({ target }) => setFormValues({ profession: target.value })}
        label="Profession:"
      />
      <Input
        required
        value={phone1}
        onChange={({ target }) => setFormValues({ phone1: target.value })}
        label="Phone number:"
        type="tel"
      />
      <Input
        value={phone2}
        onChange={({ target }) => setFormValues({ phone2: target.value })}
        label="Phone number 2 (Optional):"
      />
      <Input
        required
        value={homeAddress}
        onChange={({ target }) => setFormValues({ homeAddress: target.value })}
        label="Home address:"
      />
    </DemandFormWrapper>
  );
}

function VisaForm() {
  const {
    formValues: { kindVisa, fromEmbassy },
    setFormValues,
  } = useDemandForm();
  return (
    <DemandFormWrapper>
      <label className="my-2">
        <span className="text-sm block mb-1">Visa kind-Visa duration:</span>
        <select
          value={kindVisa}
          onChange={({ target }) => setFormValues({ kindVisa: target.value })}
        >
          <option>select...</option>
          {countries.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      <Radio.Group
        value={fromEmbassy ? "1" : "0"}
        onChange={(value) => setFormValues({ fromEmbassy: value == "1" })}
        label="Are you making your request from an embassy"
      >
        <Radio value="1">Yes</Radio>
        <Radio value="0">No</Radio>
      </Radio.Group>
      <Input required label="Price (FCFA):" disabled type="number" />
    </DemandFormWrapper>
  );
}

function TravelForm1() {
  const {
    formValues: {
      previousStayDate,
      entryDate,
      residence,
      duration,
      depCountry,
    },
    setFormValues,
  } = useDemandForm();
  return (
    <DemandFormWrapper>
      <Input
        required
        type="date"
        value={previousStayDate}
        onChange={({ target }) =>
          setFormValues({ previousStayDate: target.value })
        }
        label="Date of previous stay in Cameroon (if applicable):"
      />
      <Input
        required
        value={entryDate}
        onChange={({ target }) => setFormValues({ entryDate: target.value })}
        type="date"
        label="Date of entry in Cameroon:"
      />
      <Input
        required
        value={residence}
        onChange={({ target }) => setFormValues({ residence: target.value })}
        label="Residence address in Cameroon:"
      />
      <Input
        required
        value={duration}
        onChange={({ target }) => setFormValues({ duration: +target.value })}
        label="Duration stay in Cameroon (days):"
        type="number"
        min={1}
      />
      <label className="my-2">
        <span className="text-sm block mb-1">Country of departure:</span>
        <select
          value={depCountry}
          onChange={({ target }) => setFormValues({ depCountry: target.value })}
        >
          <option>select...</option>
          {countries.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
    </DemandFormWrapper>
  );
}
function TravelForm2() {
  const {
    formValues: { destination, returnGuarantee, subsistenceMean, tripReason },
    setFormValues,
  } = useDemandForm();
  return (
    <DemandFormWrapper>
      <label className="my-2">
        <span className="text-sm block mb-1">
          Destination after leaving Cameroon:
        </span>
        <select
          value={destination}
          onChange={({ target }) =>
            setFormValues({ destination: target.value })
          }
        >
          <option value="">select...</option>
          {cmrCities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <Textarea
        value={subsistenceMean}
        onChange={({ target }) =>
          setFormValues({ subsistenceMean: target.value })
        }
        label="Means of subsistence"
      />
      <Textarea
        value={returnGuarantee}
        onChange={({ target }) =>
          setFormValues({ returnGuarantee: target.value })
        }
        label="Return guarantee"
      />

      <label className="my-2">
        <span className="text-sm block mb-1">Reason for the trip:</span>
        <select
          value={tripReason}
          onChange={({ target }) => setFormValues({ tripReason: target.value })}
        >
          <option>select...</option>
          {countries.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
    </DemandFormWrapper>
  );
}

function PassportForm() {
  const {
    formValues: {
      passportIssueCountry,
      numDocument,
      passportIssueDate,
      passportExpireDate,
    },
    setFormValues,
  } = useDemandForm();
  return (
    <DemandFormWrapper>
      <label className="my-2">
        <span className="text-sm block mb-1">Country of issue :</span>
        <select
          value={passportIssueCountry}
          onChange={({ target }) =>
            setFormValues({ passportIssueCountry: target.value })
          }
        >
          <option>select...</option>
          {countries.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      <Input
        required
        value={numDocument}
        onChange={({ target }) => setFormValues({ numDocument: target.value })}
        label="Passport number"
        type="number"
      />
      <Input
        required
        value={passportIssueDate}
        onChange={({ target }) =>
          setFormValues({ passportIssueDate: target.value })
        }
        label="Date of issue of the passpor"
        type="date"
      />
      <Input
        required
        value={passportExpireDate}
        onChange={({ target }) =>
          setFormValues({ passportExpireDate: target.value })
        }
        label="Passport expiry date"
        type="date"
      />
    </DemandFormWrapper>
  );
}
