import express from "express";
import travelRoutes from "./routes/travelRoutes";
import activityRoutes from "./routes/activityRoutes";
import authRoutes from "./routes/authRoutes";
import inviteRoutes from "./routes/inviteRoutes";

const app = express();
app.use(express.json());

app.use("/travel", travelRoutes);
app.use("/activity", activityRoutes);
app.use("/auth", authRoutes);
app.use("/invite", inviteRoutes);

export default app;
