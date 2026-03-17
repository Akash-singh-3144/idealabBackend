import express from "express";
import {
  getFaculties,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from "../controllers/facultyController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getFaculties)
  .post(protect, admin, upload.single("photo"), createFaculty);

router.route("/:id")
  .get(getFacultyById)
  .put(protect, admin, upload.single("photo"), updateFaculty)
  .delete(protect, admin, deleteFaculty);

export default router;
