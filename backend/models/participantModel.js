import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  // 'string' should be 'String'
  name: {
    type:String,
    required: true,
  },
  rollNo: {
    type:String,
    required: true,
    uniqe:true,
  },
  year: {
    type:String,
    required: true,
  },
  department:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Department",
  },
  
  event: {
    // Property names conventionally use camelCase
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "event",
  },
},
{ timestamps: true });
const Participant = mongoose.model("Participant", participantSchema);
export default Participant;
