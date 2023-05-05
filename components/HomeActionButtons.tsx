"use client";
import React, { ReactNode, useReducer, useState } from "react";
import { Button, Input, Loading, Modal } from "@nextui-org/react";
import { createDemand } from "@/lib/prisma/demands";
import { useFetch } from "usehooks-ts";
import { IoMdCheckboxOutline } from "react-icons/io";

type ActionModalState = {
  isOpen: boolean;
  element: ReactNode;
};
const actionModalState: ActionModalState = {
  isOpen: false,
  element: <AskForm />,
};
type Action = {
  type: "CLOSE" | "OPEN";
  payload?: ReactNode;
};
function handleActionModalReducer(state: ActionModalState, action: Action) {
  switch (action.type) {
    case "CLOSE":
      return { ...state, isOpen: false };
    case "OPEN":
      return { element: action.payload, isOpen: true };
    default:
      return state;
  }
}
export default function HomeActionButtons() {
  const [state, dispatch] = useReducer(
    handleActionModalReducer,
    actionModalState
  );
  return (
    <>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => dispatch({ type: "OPEN", payload: <AskForm /> })}
          className="border-red-500 border transition-all hover:-translate-y-[1.1px] hover:scale-105 text-red-500 font-semibold py-3 px-6 rounded-full inline-block"
        >
          Commencer
        </button>
        <button
          onClick={() =>
            dispatch({ type: "OPEN", payload: <VerfiyStatusForm /> })
          }
          className="bg-red-500 transition-all hover:-translate-y-[1.1px] hover:scale-105 text-white font-semibold py-3 px-6 rounded-full inline-block"
        >
          Suivre votre demande
        </button>
      </div>

      <Modal
        blur
        onClose={() => dispatch({ type: "CLOSE" })}
        open={state.isOpen}
      >
        {state.element}
      </Modal>
    </>
  );
}

function AskForm() {
  const [email, setEmail] = useState("");
  const [emailVerif, setEmailVerif] = useState("");
  const [numDocument, setNumDocument] = useState("");
  const [error, seterror] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passportExpireDate, setPassportExpireDate] = useState<string>();
  async function handleAsk(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/demands", {
        method: "POST",
        body: JSON.stringify({ email, numDocument, passportExpireDate }),
      });
      if (response.ok) {
        console.log(await response.json());
        return setSuccess(true);
      }
      seterror("Somthing wrong! Please try later");
    } catch (error) {
      seterror("Somthing wrong! Please try later");
    } finally {
      setLoading(false);
    }
  }
  if (success)
    return (
      <>
        <Modal.Header>
          <h2 className="text-xl">SUCCESS</h2>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center text-green-500">
            <IoMdCheckboxOutline className="mx-auto" size={30} />
            <p>Please check your email to continue.</p>
          </div>
        </Modal.Body>
      </>
    );
  return (
    <form onSubmit={handleAsk}>
      <Modal.Header>
        <h2 className="text-xl">DEMANDER UN E-VISA</h2>
      </Modal.Header>
      <Modal.Body>
        {error.length > 0 && <small className="text-red-600">{error}</small>}
        <Input
          label="Email:"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="email"
          placeholder="Votre adresse E-Mail"
          required
        />
        <Input
          label="Confirmer:"
          value={emailVerif}
          onChange={({ target }) => setEmailVerif(target.value)}
          placeholder="Confirmer votre adresse e-mail"
        />
        <Input
          label="Numéro de passport:"
          value={numDocument}
          onChange={({ target }) => setNumDocument(target.value)}
          placeholder="Le numero de votre passport"
          required
        />
        <Input
          label="Date d'expiration de votre passport:"
          value={passportExpireDate}
          onChange={({ target }) => setPassportExpireDate(target.value)}
          type="date"
          placeholder="Le numero de votre passport"
          required
        />
      </Modal.Body>
      <Modal.Footer>
        <div className="flex gap-3">
          {loading && <Loading color="error" />}
          <button
            type="submit"
            disabled={
              loading ||
              email.length == 0 ||
              email !== emailVerif ||
              numDocument.length < 3 ||
              (passportExpireDate?.length || 0) < 1
            }
            className="border-red-500 disabled:border-red-300 border transition-all hover:-translate-y-[1.1px] disabled:hover:translate-y-0 disabled:hover:scale-100 hover:scale-105 text-red-500 disabled:text-red-300 font-semibold py-3 px-6 rounded-full inline-block"
          >
            Send
          </button>
        </div>
      </Modal.Footer>
    </form>
  );
}

function VerfiyStatusForm() {
  const notFound = false;
  function handleCheck(e: any) {
    e.preventDefault();
  }
  return (
    <form onSubmit={handleCheck}>
      <Modal.Header>
        <h2 className="text-xl">VÉRIFIER LE STATUT DE VOTRE DEMANDE</h2>
      </Modal.Header>
      <Modal.Body>
        {notFound && (
          <p className="text-red-600">
            Nous n&apos;avons trouvé aucune demande correspondant à ce numéro!
          </p>
        )}
        <Input label="Numéro de demande:" required />
      </Modal.Body>
      <Modal.Footer>
        <div className="flex gap-3">
          {<Loading color="error" />}
          <button
            type="submit"
            className="border-red-500 disabled:border-red-300 border transition-all hover:-translate-y-[1.1px] disabled:hover:translate-y-0 disabled:hover:scale-100 hover:scale-105 text-red-500 disabled:text-red-300 font-semibold py-3 px-6 rounded-full inline-block"
          >
            Verify
          </button>
        </div>
      </Modal.Footer>
    </form>
  );
}
