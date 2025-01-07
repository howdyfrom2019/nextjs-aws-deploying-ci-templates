import {
  ModalContext,
  ModalContextValue,
  ModalDispatchContext,
} from "@/providers/client/modal-context";
import { useCallback, useContext } from "react";

export default function useModal() {
  const modals = useContext(ModalContext);
  const dispatch = useContext(ModalDispatchContext);

  const openModal = useCallback(
    (modalProps: ModalContextValue) => {
      if (!dispatch)
        throw {
          statusCode: 400,
          message: "React Context is not initialized yet.",
        };
      dispatch({
        type: "open",
        ...modalProps,
      });
    },
    [dispatch]
  );

  const closeModal = useCallback(
    (modalKey?: string) => {
      if (!dispatch)
        throw {
          statusCode: 400,
          message: "React Context is not initialized yet.",
        };

      dispatch({
        type: "close",
        modalKey,
      });
    },
    [dispatch]
  );

  return {
    modals,
    openModal,
    closeModal,
  };
}
