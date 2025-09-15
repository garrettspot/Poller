import mongoose from "mongoose";
/*
Poll {
  _id: ObjectId,
  userId: ObjectId,
  question: string,
  options:[ { text:string, votes:number } ],
  createdAt: Date
}
*/
const optionSchema = new mongoose.Schema({
  text: String,
  votes: { type: Number, default: 0 }
});

const pollSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [optionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Poll || mongoose.model("Poll", pollSchema);
