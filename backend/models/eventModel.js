  import mongoose from "mongoose";
  const { ObjectId } = mongoose.Schema;

  const eventSchema = mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
      time: { type: Date, required: true },
      venue: { type: String, required: true },
      registrationDeadline: { type: Date, required: true },
      eventdetils: { type: String },
      first:{type:Number,required:true,default:0},
      second:{type:Number,required:true,default:0},
      third:{type:Number,required:true,default:0},
    },
    { timestamps: true }

  );

  const Event = mongoose.model("event", eventSchema);
  export default Event;
