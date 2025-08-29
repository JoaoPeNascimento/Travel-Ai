import express from "express";
import cors from "cors";
import travelRoutes from "./routes/travelRoutes";
import activityRoutes from "./routes/activityRoutes";
import authRoutes from "./routes/authRoutes";
import inviteRoutes from "./routes/inviteRoutes";
import geminiRoutes from "./routes/geminiRoutes";

const app = express();
app.use(express.json());

app.use(cors({ origin: "https://intellitrip-two.vercel.app" }));

app.use("/travel", travelRoutes);
app.use("/activity", activityRoutes);
app.use("/auth", authRoutes);
app.use("/invite", inviteRoutes);
app.use("/ia", geminiRoutes);

export default app;
