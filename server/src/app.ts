import express from "express";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import prerender from "prerender-node";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/database";
import userRoutes from "./routes/user.routes";
import { Request, Response } from "express";

dotenv.config();

export const app = express();

const buildPath = path.join(__dirname, '../dist');

app.use(cors());
app.use(express.json());

connectDB();

prerender.set("prerenderToken", "eKKZaUpxL4vxqgimsOoV");
app.use(prerender);

app.use("/api", userRoutes);

app.use(express.static(buildPath));

app.get('*', (_, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.get("/", (_req: Request, res: Response) => {
  res.send("Backend is running!");
});
