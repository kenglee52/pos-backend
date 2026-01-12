import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import unitRouter from "./routes/unit.router";
import customerRouter from "./routes/customer.router";
import deparmentRouter from "./routes/department.router";
import employeeRouter  from "./routes/employee.router";
import categoryRouter  from "./routes/category.router";
import productRouter from "./routes/product.router";
import billRouter from "./routes/bill.router";
import supplierRouter from "./routes/supplier.router";
import orderRouter from "./routes/order.router";
import onlineBillRouter from "./routes/online_bill.router";
import onlineOrderRouter from "./routes/online_order.router";
import importBillRouter from "./routes/import_bill.router";
import importOrderRouter from "./routes/import_order.router";
import reportRouter from "./reports/router.report";
import "dotenv/config";
import { db } from "./config/database";

async function startServer() {
   try {
      const con = await db.getConnection();
      if(con){
         console.log("Connected to the database");
      }
      con.release();
   } catch (error) {
      console.log(error);
   }
}

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", unitRouter);
app.use("/api", customerRouter);
app.use("/api", deparmentRouter);
app.use("/api", employeeRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", billRouter);
app.use("/api", supplierRouter);
app.use("/api", orderRouter);
app.use("/api", onlineBillRouter);
app.use("/api", onlineOrderRouter);
app.use("/api", importBillRouter);
app.use("/api", importOrderRouter);
app.use("/api/report/", reportRouter)


app.listen(port, ()=> {
   console.log(`Server is runing on port ${port}`);
   startServer();
})