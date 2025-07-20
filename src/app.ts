import express from "express";
import travelRoutes from "./routes/travelRoutes";
import activityRoutes from "./routes/activityRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.json());

app.use("/travel", travelRoutes);
app.use("/activity", activityRoutes);
app.use("/auth", authRoutes);

export default app;
