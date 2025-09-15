import mongoose from "mongoose";

/*
Vote {
  _id: ObjectId,
  pollId: ObjectId,
  userId: ObjectId,
  optionIndex: number
}
*/

const voteSchema = new mongoose.Schema({
  pollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poll",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  optionIndex: {
    type: Number,
    required: true
  }
});

const Vote = mongoose.model("Vote", voteSchema);

export default Vote;
