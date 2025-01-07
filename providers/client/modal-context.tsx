"use client";

import Modal from "@/components/custom/modal";
import React, { Dispatch, useReducer } from "react";

export type ModalContextValue = {
  modalKey: string;
  component: React.ReactNode;
  onClose?: () => void;
};

export type ModalDispatchActionType =
  | {
      type: "open";
      modalKey: string;
      component: React.ReactNode;
      onClose?: () => void;
    }
  | {
      type: "close";
      modalKey?: string;
    };
type ModalDispatchType = Dispatch<ModalDispatchActionType>;

export const ModalContext = React.createContext<ModalContextValue[]>([]);
export const ModalDispatchContext =
  React.createContext<ModalDispatchType | null>(null);

const handleModalsReducer = (
  state: ModalContextValue[],
  action: ModalDispatchActionType
): ModalContextValue[] => {
  const { type, ...modalValue } = action;
  switch (type) {
    case "open": {
      if (state.find((modal) => modal.modalKey === modalValue.modalKey)) {
        return state;
      }
      return [...state, modalValue as ModalContextValue];
    }
    case "close":
    default: {
      if (action.modalKey) {
        return state.filter((modal) => modal.modalKey !== action.modalKey);
      }

      return [];
    }
  }
};

export default function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(handleModalsReducer, []);

  return (
    <ModalContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
        <Modal />
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
}
