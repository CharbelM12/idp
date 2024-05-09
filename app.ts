import config from "./src/configurations/config";
import connect from "./src/database/database";
import globalRoutes from "./src/globalRoutes";
import bodyParser from "body-parser";
import express from "express";
import errorMiddleware from "./src/middleware/error.middleware";
import corsMiddleware from "./src/middleware/cors.middleware";

const app = express();
app.use(bodyParser.json());
app.use(corsMiddleware);
app.use(globalRoutes);
app.use(errorMiddleware);

app.listen(config.port, async () => {
  await connect();
});
