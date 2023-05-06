import express from "express";
import { 
  authErrorHandler,
  generalErrorHandler,
  prismaErrorHandler
} from "./Middleware/Handling";

import apiV1 from "./Routes/API/v1";

const app = express();

// allow json parsing in the body of the request.
app.use(express.json());

// api mountpoint
app.use('/', apiV1);

app.get("/", (_req, res) => {
  return res.send("Deskify API");
});

app.use(authErrorHandler, prismaErrorHandler, generalErrorHandler);

export default app;

