import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env} from "./config/env.js";
import routes from "./routes/index.js";
const app=express();

app.use(cors({ origin: env.CLIENT_URL }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

export default app;