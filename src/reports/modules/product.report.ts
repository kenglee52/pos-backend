import { db } from "../../config/database";
import { Request, Response} from "express";

export const getBestProduct = async(req: Request, res: Response) => {
    try {
         const [rows] = await db.query(`
            SELECT 
                p.productID,
                p.productName,
                c.categoryID,
                c.categoryName AS category,
                u.unitName AS unit,
                u.unitID,
                p.price,
                p.image,
                p.importPrice,
                p.stockQty,
                p.importPrice,
                p.manufacture,
                p.expiry,
                p.description,
                SUM(oo.saleQty) AS totalSold
            FROM online_order oo
            JOIN product p ON oo.productID = p.productID
            JOIN category c ON p.categoryID = c.categoryID
            JOIN unit u ON p.unitID = u.unitID
            GROUP BY 
                p.productID, p.productName, c.categoryName, u.unitName, p.price, p.image, p.description
            ORDER BY totalSold DESC;
         `);

         res.status(200).json(rows);
    } catch (error) {
         console.log(error);
         res.status(500).json({
            message: "Server error",
            error
         });
    }
}
