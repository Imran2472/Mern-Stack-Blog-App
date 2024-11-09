import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  coverImg: {
    type: String,
    required: true,
    default: "https://via.placeholder.com/200x200",
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Rating: {
    type: Number,
    required: true,
    default: 0,
  },

  creatAt: {
    type: Date,
    default: Date.now(),
  },
});

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;
