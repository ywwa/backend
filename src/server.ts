import app from "./App";

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.listen(port, () => {
  console.log(`DeskifyAPI Express Server initialized on port ${port}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED: Closing HTTP Server");
  process.exit();
})

process.on("SIGINT", () => {
  console.log("SIGINT RECEIVED: Closing HTTP Server");
  process.exit();
});

