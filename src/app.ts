import express from "express";
import travelRoutes from "./routes/travelRoutes";

const app = express();
app.use(express.json());

app.use("/travel", travelRoutes);

export default app;
