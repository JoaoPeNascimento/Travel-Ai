import express from "express";
import travelRoutes from "./routes/travelRoutes";
import activityRoutes from "./routes/activityRoutes";

const app = express();
app.use(express.json());

app.use("/travel", travelRoutes);
app.use("/activity", activityRoutes);

export default app;
