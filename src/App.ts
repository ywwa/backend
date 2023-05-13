import express from "express";
import {
  authErrorHandler,
  prismaErrorHandler,
  generalErrorHandler,
} from "./Middleware/Handler";
import apiRouterV1 from "./Route/apiV1";

const app = express();

app.use(express.json());

app.use('/', apiRouterV1);

app.use(authErrorHandler, prismaErrorHandler, generalErrorHandler);

export default app;

