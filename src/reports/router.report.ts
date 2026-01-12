import * as productReport from "./modules/product.report";
import { Router } from "express";
const router = Router();

router.get("/best-product", productReport.getBestProduct);

export default router;