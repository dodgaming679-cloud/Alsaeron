import { Router } from "express";
import { db } from "@workspace/db";
import { ordersTable } from "@workspace/db/schema";
import { desc } from "drizzle-orm";
import { randomBytes } from "crypto";

const router = Router();

function generateOrderId(): string {
  return "ALR-" + randomBytes(4).toString("hex").toUpperCase();
}

router.post("/orders", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      products,
      totalAmount,
      paymentScreenshot,
    } = req.body as {
      fullName: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      pincode: string;
      products: unknown;
      totalAmount: string;
      paymentScreenshot?: string;
    };

    if (
      !fullName || !email || !phone || !address ||
      !city || !state || !pincode || !products || !totalAmount
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const orderId = generateOrderId();

    const [order] = await db
      .insert(ordersTable)
      .values({
        orderId,
        fullName,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        products: products as Record<string, unknown>[],
        totalAmount,
        paymentScreenshot: paymentScreenshot ?? null,
        status: "pending",
      })
      .returning();

    req.log.info({ orderId }, "Order created");
    return res.status(201).json({ success: true, orderId: order.orderId });
  } catch (err) {
    req.log.error(err, "Failed to create order");
    return res.status(500).json({ error: "Failed to create order" });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await db
      .select()
      .from(ordersTable)
      .orderBy(desc(ordersTable.createdAt));
    return res.json({ orders });
  } catch (err) {
    req.log.error(err, "Failed to fetch orders");
    return res.status(500).json({ error: "Failed to fetch orders" });
  }
});

export default router;