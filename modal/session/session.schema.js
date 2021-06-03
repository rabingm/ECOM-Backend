import mongoose from "mongoose";

const SessionSchema = mongoose.Schema(
  {
    accessJwt: {
      type: String,
      require: true,
      default: "",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      default: null,
    },
  },
  {
    timestamp: true,
  }
);

const SesSchema = mongoose.model("ClientSession", SessionSchema);

export default SesSchema;
