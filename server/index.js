import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { userAuth } from "./routes/auth.js";
import { adminRoute } from "./routes/adminRoutes.js";
import { Criteria1_submit } from "./routes/criteria1.js";
import { C11 } from "./routes/c-1-1.js";
import { C12 } from "./routes/c-1-2.js";
import { C13 } from "./routes/c-1-3.js";
import { C21 } from "./routes/c-2-1.js";
import { C22 } from "./routes/c-2-2.js";
import { C23 } from "./routes/c-2-3.js";
import { C24 } from "./routes/c-2-4.js";
import { C25 } from "./routes/c-2-5.js";
import { C26 } from "./routes/c-2-6.js";
import { fetchC1 } from "./routes/fetchC1.js";
import { Files } from "./routes/files.js";
import { C31 } from "./routes/c-3-1.js";
import { C32 } from "./routes/c-3-2.js";
import { C33 } from "./routes/c-3-3.js";
import { C34 } from "./routes/c-3-4.js";
import { C35 } from "./routes/c-3-5.js";
import { C36 } from "./routes/c-3-6.js";
import { C37 } from "./routes/c-3-7.js";
import { Criteria3_submit } from "./routes/criteria3.js";
import { C41 } from "./routes/c-4-1.js";
import { C42 } from "./routes/c-4-2.js";
import { C43 } from "./routes/c-4-3.js";
import { C44 } from "./routes/c-4-4.js";
import { Criteria4_submit } from "./routes/criteria4.js";
import { C51 } from "./routes/c-5-1.js";
import { C52 } from "./routes/c-5-2.js";
import { C53 } from "./routes/c-5-3.js";
import { C54 } from "./routes/c-5-4.js";
import { fetchC5 } from "./routes/fetchC5.js";
import { Criteria5_submit } from "./routes/criteria5.js";
import { fetchC3 } from "./routes/fetchC3.js";
import { Criteria2_submit } from "./routes/criteria2.js";
import { fetchC2 } from "./routes/fetchC2.js";
import { fetchC4 } from "./routes/fetchC4.js";
import { C61 } from "./routes/c-6-1.js";
import { C62 } from "./routes/c-6-2.js";
import { C63 } from "./routes/c-6-3.js";
import { C64 } from "./routes/c-6-4.js";
import { C65 } from "./routes/c-6-5.js";
import { Criteria6_submit } from "./routes/criteria6.js";
import { fetchC6 } from "./routes/fetchC6.js";
import { C71 } from "./routes/c-7-1.js";
import { C72 } from "./routes/c-7-2.js";
import { C73 } from "./routes/c-7-3.js";
import { Criteria7_submit } from "./routes/criteria7.js";
import { fetchC7 } from "./routes/fetchC7.js";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const db_url = process.env.DATABASE_URL;
mongoose
  .connect(db_url)
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log(`DB conection failed: ${err}`);
  });

app.use("/auth", userAuth);
app.use("/admin", adminRoute);
app.use("/data", [
  Criteria1_submit,
  C11,
  C12,
  C13,
  C21,
  C22,
  C23,
  C24,
  C25,
  C26,
  Criteria2_submit,
  fetchC1,
  fetchC2,
  C31,
  C32,
  C33,
  C34,
  C35,
  C36,
  C37,
  Criteria3_submit,
  fetchC3,
  C41,
  C42,
  C43,
  C44,
  Criteria4_submit,
  fetchC4,
  C51,
  C52,
  C53,
  C54,
  fetchC5,
  Criteria5_submit,
  C61,
  C62,
  C63,
  C64,
  C65,
  Criteria6_submit,
  fetchC6,
  C71,
  C72,
  C73,
  Criteria7_submit,
  fetchC7,
]);
app.use("/files", Files);

app.listen(5000, () => console.log("Server started"));
