"use client";
import React, { ReactNode, useReducer, useState } from "react";
import { Button, Input, Loading, Modal } from "@nextui-org/react";
import { VerfiyStatusForm } from "./VerfiyStatusForm";
import { AskForm } from "./AskForm";
import { ActionModalState, handleActionModalReducer } from "@/lib/reducers";

const actionModalState: ActionModalState = {
  isOpen: false,
  element: <AskForm />,
};

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
