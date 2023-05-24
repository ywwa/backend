import express from "express";
import {
  authErrorHandler,
  generalErrorHandler,
  prismaErrorHandler,
} from "./Middleware/ErrorHandler";
import apiRouterV1 from "./Route/v1";

const app = express();

app.use(express.json());

app.use("/api/v1/", apiRouterV1);

app.use(
  authErrorHandler,
  prismaErrorHandler,
  generalErrorHandler,
);

export default app;
