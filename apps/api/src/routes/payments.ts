import { Router } from "express";
import { submitPayment } from "../controllers/paymentsController";
import { requireBody } from "../middleware/validate";

const router = Router();

/**
 * POST /api/payments/submit
 * Submit a signed XDR transaction to Horizon.
 * Body: { xdr: string }
 */
router.post("/submit", requireBody("xdr"), submitPayment);

export default router;
