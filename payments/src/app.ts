import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@demris/common";
import { createChargeRouter } from "./routes/new";
// import { indexPaymentsRouter } from "./routes/index";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);
app.use(currentUser);
app.use(createChargeRouter);
// app.use(indexPaymentsRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);
export { app };
