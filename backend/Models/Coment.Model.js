import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  creatAt: {
    type: Date,
    default: Date.now(),
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
