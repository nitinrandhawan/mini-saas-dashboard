import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: {
      type: String,
      enum: [
        "new",
        "contacted",
        "interested",
        "qualified",
        "proposal_sent",
        "follow_up",
        "converted",
        "lost",
      ],
      default: "new",
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
