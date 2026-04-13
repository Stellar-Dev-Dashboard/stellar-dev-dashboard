import { Router } from "express";
import { getWalletInfo } from "../controllers/walletController";

const router = Router();

/**
 * GET /api/wallet/:address
 * Returns account info and balances from Horizon.
 */
router.get("/:address", getWalletInfo);

export default router;
