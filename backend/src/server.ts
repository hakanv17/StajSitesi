import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import partRouter from "./routers/part.router";
import userRouter from "./routers/user.router";
import { dbConnect } from "./configs/database.config";
dbConnect();


const app = express();
app.use(express.json());

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));


const port = 4800;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})

app.use("/api/parts",partRouter);
app.use("/api/users",userRouter);


 