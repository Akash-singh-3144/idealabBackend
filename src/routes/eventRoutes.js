import express from "express";
import {
  getEvents,
  createEvent,
  deleteEvent,
  registerForEvent,
  getMyEvents,
  getEventRegistrations,
} from "../controllers/eventController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public / Student Routes
router.get("/", getEvents);
router.post(
  "/:id/register",
  protect,
  upload.fields([{ name: "idCardPhoto", maxCount: 1 }, { name: "registrationHardcopy", maxCount: 1 }]),
  registerForEvent
);
router.get("/my-events", protect, getMyEvents);

// Admin Routes
router.post("/create", protect, admin, createEvent);
router.delete("/:id", protect, admin, deleteEvent);
router.get("/registrations", protect, admin, getEventRegistrations);

export default router;
