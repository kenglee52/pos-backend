import { db } from "../../config/database";
import { Request, Response } from "express";


export const getOnlineOrderByBillId = async(req: Request, res: Response) =>{
         const id = req.params.id;
         try {
             const [row] = await db.query("SELECT p.productID, p.productName, p.price, o.saleQty, o.total FROM online_order o INNER JOIN product p ON o.productID = p.productID WHERE o.onlineBillID = ?", [id]);
             res.status(200).json(row)
         } catch (error) {
            console.log(error);
            res.status(500).send({
                  message: "Server error",
                  error
            })
         }
}