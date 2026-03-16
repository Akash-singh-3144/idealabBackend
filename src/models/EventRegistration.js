import mongoose from "mongoose";

const eventRegistrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    idCardPhoto: {
      type: String,
      default: "",
    },
    registrationHardcopy: {
      type: String,
      default: "",
    },
    studentDetails: {
      name: { type: String, required: true },
      year: { type: String, required: true },
      branch: { type: String, required: true },
      rollNo: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const EventRegistration = mongoose.model("EventRegistration", eventRegistrationSchema);

export default EventRegistration;
