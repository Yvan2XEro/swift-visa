"use client";
import {
  ActionModalState,
  dataReducer,
  handleActionModalReducer,
} from "@/lib/reducers";
import { Demand } from "@/types";
import { Badge, Button, Loading, Modal, Table } from "@nextui-org/react";
import React, { useEffect, useReducer, useState, useTransition } from "react";
import DemandToPrint from "./DemandToPrint";
import DemandDocuments from "./DemandDocuments";
import { handleDeleteAction } from "@/lib/actions";

const actionModalState: ActionModalState = {
  isOpen: false,
  element: <></>,
};
async function fetchData() {
  const response = await fetch(`/api/demands`);
  const data = await response.json();
  if (response.ok) {
    return data as Demand[];
  }
  throw Error("Unable to fetch data");
}
const initialData = {
  loading: true,
  data: [] as Demand[],
  error: null,
};

const initialModalState = {
  isOpen: false,
  element: <></>,
};

export default function DemandList() {
  const [selectedDemand, setSelectedDemand] = useState<Demand>();
  let [isPending, startTransition] = useTransition();
  const [dataState, dispacthDataAction] = useReducer(dataReducer, initialData);
  const [modalState, dispatchModalAction] = useReducer(
    handleActionModalReducer,
    initialModalState
  );

  useEffect(() => {
    (async () => {
      await handleFetch();
    })();
  }, []);

  async function handleFetch() {
    dispacthDataAction({ type: "SET_LOADING", payload: true });
    try {
      const data = await fetchData();
      dispacthDataAction({ type: "SET_DATA", payload: data });
    } catch (error) {
      dispacthDataAction({ type: "SET_ERROR", payload: error });
    } finally {
      dispacthDataAction({ type: "SET_LOADING", payload: false });
    }
  }

  useEffect(() => {
    console.log(dataState);
  }, [dataState]);

  async function handleAgree() {
    if (!!selectedDemand) {
      dispacthDataAction({ type: "SET_LOADING", payload: true });
      const response = await agree(selectedDemand);
      if (response.ok) {
        await handleFetch();
      }
      dispacthDataAction({ type: "SET_LOADING", payload: false });
      handleCloseModal();
    }
  }
  function handleOpenOnModal(d: Demand) {
    setSelectedDemand(d);
    dispatchModalAction({
      type: "OPEN",
      payload: (
        <>
          <DemandToPrint demand={d} footer={false} />
          <DemandDocuments demand={d} />
        </>
      ),
    });
  }
  function handleCloseModal() {
    setSelectedDemand(undefined);
    dispatchModalAction({ type: "CLOSE" });
  }

  function renderContent() {
    if (dataState.loading || isPending)
      return (
        <div className="flex justify-center items-center h-screen">
          <Loading color="error" />
        </div>
      );
    if (!!dataState.error)
      return (
        <div className="flex justify-center items-center h-screen">ERROR</div>
      );
    return (
      <Table>
        <Table.Header>
          <Table.Column>Id</Table.Column>
          <Table.Column>CNI Number</Table.Column>
          <Table.Column>Name</Table.Column>
          <Table.Column>Num passport</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Details</Table.Column>
          <Table.Column>Delete</Table.Column>
        </Table.Header>
        <Table.Body>
          {dataState.data.map((d) => (
            <Table.Row key={d.id}>
              <Table.Cell>{d.id}</Table.Cell>
              <Table.Cell>{d.cniNumber || "//"}</Table.Cell>
              <Table.Cell>
                {d.lastName || d.firstName
                  ? `${d.firstName} ${d.lastName}`
                  : "//"}
              </Table.Cell>
              <Table.Cell>{d.numDocument}</Table.Cell>
              <Table.Cell>
                <Badge color={d.statut === "paid" ? "success" : "warning"}>
                  {d.statut}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Button
                  color="gradient"
                  disabled={isPending || dataState.loading}
                  size={"sm"}
                  onClick={() => handleOpenOnModal(d)}
                >
                  Details
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  color="error"
                  size={"sm"}
                  disabled={isPending || dataState.loading}
                  onClick={() =>
                    startTransition(() => {
                      handleDeleteAction(d).then(handleFetch);
                    })
                  }
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }

  return (
    <div>
      {renderContent()}
      <Modal
        blur
        fullScreen
        scroll
        open={modalState.isOpen}
        onClose={handleCloseModal}
      >
        <Modal.Header>
          <h2 className="text-xl">DEMAND DETAILS</h2>
        </Modal.Header>
        <Modal.Body>{modalState.element}</Modal.Body>
        <Modal.Footer>
          <Badge
            color={selectedDemand?.statut === "paid" ? "success" : "default"}
          >
            {selectedDemand?.statut}
          </Badge>
          <Button
            disabled={isPending || dataState.loading}
            flat
            auto
            color="error"
            onPress={handleCloseModal}
          >
            Close
          </Button>
          <Button
            disabled={
              isPending ||
              dataState.loading ||
              selectedDemand?.statut !== "paid"
            }
            color="error"
            onPress={handleAgree}
          >
            Agree
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

async function agree(d: Demand) {
  return await fetch("/api/demands/" + d.id + "/agree", { method: "PUT" });
}
