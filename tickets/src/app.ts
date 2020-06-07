import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@demris/common";

import { createTicketsRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);

app.use(createTicketsRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);
export { app };
