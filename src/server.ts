import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import unitRouter from "./routes/unit.router";
import "dotenv/config"

const port =  3000;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", unitRouter);

app.listen(port, ()=> {
   console.log(`Server is runing on port ${port}`);
})