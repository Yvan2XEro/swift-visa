import { Demand } from "@/types";
import { ReactNode } from "react";

export type ActionModalState = {
    isOpen: boolean;
    element: ReactNode;
};
export type Action = {
    type: "CLOSE" | "OPEN";
    payload?: ReactNode;
};

export function handleActionModalReducer(state: ActionModalState, action: Action) {
    switch (action.type) {
        case "CLOSE":
            return { ...state, isOpen: false };
        case "OPEN":
            return { element: action.payload, isOpen: true };
        default:
            return { ...state };
    }
}

type DataState = {
    loading: boolean,
    data: Demand[],
    error: any,
}
type DataAction = {
    payload: any;
    type: "SET_ERROR" | "SET_DATA" | "SET_LOADING";
}
export function dataReducer(dataState: DataState, action: DataAction) {
    switch (action.type) {
        case "SET_DATA":
            dataState.error = null;
            dataState.loading = false;
            dataState.data = action.payload;
            return { ...dataState };

        case "SET_LOADING":
            dataState.loading = action.payload;
            return { ...dataState };

        case "SET_ERROR":
            dataState.error = action.payload;
            dataState.loading = false;
            return { ...dataState };

        default:
            return { ...dataState };
    }
}