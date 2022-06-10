import { Status } from "https://deno.land/x/oak@v10.6.0/mod.ts";

export interface Error {
  code: number;
  message: string;
}

// a list of reusable, common errors
const errors: Record<string, Error> = {
  Unauthorized: {
    code: Status.Unauthorized,
    message: "Not authorized to access endpoint",
  },
  Forbidden: {
    code: Status.Forbidden,
    message: "Endpoint could not be accessed",
  },
  NotFound: {
    code: Status.NotFound,
    message: "Resource not found",
  },
  BadReqest: {
    code: Status.BadRequest,
    message: "Invalid input",
  },
  InternalServerError: {
    code: Status.InternalServerError,
    message: "There was a problem processing your request",
  },
};

export default errors;
