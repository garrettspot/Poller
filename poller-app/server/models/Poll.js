import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
    text: String,
    votes: { type: Number, default: 0 }
});

const voteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    optionIndex: Number
});

const pollSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [optionSchema],
    votes: [voteSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Poll', pollSchema);
