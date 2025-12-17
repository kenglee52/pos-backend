import { Router } from "express";
import * as customerController from "../controllers/customer.controller";

const router = Router();

router.post("/customer", customerController.createCustomer);

router.get("/customer", customerController.getCustomers);

router.get("/customer/:id", customerController.getCustomerById);

router.put("/customer/:id", customerController.updateCustomer);

router.delete("/customer/:id", customerController.deleteCustomer);

router.post("/customer-login", customerController.loginCustomer);

export default router;
