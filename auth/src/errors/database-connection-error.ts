import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to Database.";
  constructor() {
    super("Error connecting to Database.");
    //Because of TS, anytime extending a built in class, one must do:
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
