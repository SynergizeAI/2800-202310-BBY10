import express from "express";
import {
  createChatSpace,
  joinChatSpace,
  getChatSpace,
  validateMembership,
} from "../controllers/chatSpaceController.mjs";

const router = express.Router();

router.post("/create", createChatSpace);
router.post("/join", joinChatSpace);
router.get("/validate-membership", validateMembership);
router.get("/:id", getChatSpace);

export default router;
