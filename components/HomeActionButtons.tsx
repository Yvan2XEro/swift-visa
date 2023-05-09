"use client";
import React, { ReactNode, useReducer, useState } from "react";
import { Button, Input, Loading, Modal } from "@nextui-org/react";
import { VerfiyStatusForm } from "./VerfiyStatusForm";
import { AskForm } from "./AskForm";

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
          Start
        </button>
        <button
          onClick={() =>
            dispatch({ type: "OPEN", payload: <VerfiyStatusForm /> })
          }
          className="bg-red-500 transition-all hover:-translate-y-[1.1px] hover:scale-105 text-white font-semibold py-3 px-6 rounded-full inline-block"
        >
          Follow up your request
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
