import express from "express";

import {
  createWorkspace,
  getMyWorkspaces, getWorkspace
} from "../controllers/workspaceController.js";

import { protect } from "../middlewares/authMiddleware.js";

import {
  requireWorkspaceMember,
} from "../middlewares/workspaceMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createWorkspace
);

router.get(
  "/",
  protect,
  getMyWorkspaces
);

router.get(
  "/:workspaceId",
  protect,
  requireWorkspaceMember,
  getWorkspace
);

export default router;