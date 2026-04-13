import { Router } from "express";
import { listPayments, listTransactions } from "../controllers/transactionsController";

const router = Router();

/**
 * GET /api/transactions/:address/payments
 * List recent payments for an account.
 */
router.get("/:address/payments", listPayments);

/**
 * GET /api/transactions/:address
 * List recent transactions for an account.
 */
router.get("/:address", listTransactions);

export default router;
