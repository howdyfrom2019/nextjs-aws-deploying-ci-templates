import { toast } from "sonner";

function isServerError(error: any): error is ServerError {
  return (
    typeof error.statusCode === "number" &&
    (typeof error.message === "string" || typeof error.message === "object")
  );
}

export default function commonErrorHandler(error: unknown) {
  return Promise.reject(error);
}

export function toastErrorHandler(error: unknown) {
  const toastId = "@error-handler-common-toast";
  if (isServerError(error)) {
    let { statusCode, message } = error;

    switch (statusCode) {
      case 401:
        if (!message) {
          message = "No authorization. Please re-Login";
        }
        break;
      case 500:
        if (!message) {
          message = "Internal Server Error";
        }
        break;
      default:
        if (!message) {
          message = "Unhandled Error happened. Please check console log.";
        }
        break;
    }

    toast.error(`[${statusCode}] ${message}`, {
      id: toastId,
    });
  }

  return commonErrorHandler(error);
}
