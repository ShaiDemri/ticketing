import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("404 not found!");

    //Because of TS, anytime extending a built in class, one must do:
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: "404 not found" }];
  }
}
