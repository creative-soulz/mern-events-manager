  import mongoose from "mongoose";

  const pointSchema = new mongoose.Schema({
    // 'string' should be 'String'
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Participant",
    },

    point: {
      type: Number,
      required: true,
    },
  });
  const Point = mongoose.model("Point", pointSchema);
  export default Point;
