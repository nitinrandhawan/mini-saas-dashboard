import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/lead.controller.js";
const router = Router();

router.post("/create-lead", verifyToken, createLead);
router.get("/get-leads", verifyToken, getLeads);
router.get("/get-lead/:id", verifyToken, getLeadById);
router.put("/update-lead/:id", verifyToken, updateLead);
router.delete("/delete-lead/:id", verifyToken, deleteLead);

export default router;
