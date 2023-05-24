import app from "./App";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.listen(port, () => {
  console.log(
    `DeskifyAPI Express Server initialized on port ${port}`,
  );
});

process.on("SIGTERM", () => {
  console.log(
    "SIGTERM Received: Closing HTTP Server",
  );
  process.exit();
});

process.on("SIGINT", () => {
  console.log(
    "SIGINT Received: Closing HTTP Server",
  );
  process.exit();
});
