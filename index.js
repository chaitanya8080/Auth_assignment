import express from "express";

import { config } from "dotenv";
import { connection } from "./config/database.js";
import User from "./routes/userRoutes.js";
import cors from "cors";

config({
  path: "./config/config.env",
});

const app = express();
//routes
app.use(express.json());

app.use(cors())

app.use("/user", User);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`server is working on port: ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});



