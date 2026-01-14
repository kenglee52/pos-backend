import * as productReport from "./modules/product.report";
import * as onlineBillReport from "./modules/online_bill.report";
import * as onlineOrderReport from "./modules/online_order.report";
import { Router } from "express";
const router = Router();

router.get("/best-product", productReport.getBestProduct);
router.get("/online_bill/:id", onlineBillReport.getOnlineBillByCustomerId);
router.get("/online_order/:id", onlineOrderReport.getOnlineOrderByBillId)
export default router;