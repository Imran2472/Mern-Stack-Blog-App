import Blog from "../Models/Blogs.Models.js";
import Comment from "../Models/Coment.Model.js";
export const CreatComment = async (req, res) => {
  try {
    const { text, userId, blogId } = req.body;
    const comment = new Comment({
      text,
      userId,
      blogId,
    });
    await comment.save();
    res.json({
      success: true,
      message: "Comment created successfully",
      comment,
    });
  } catch (error) {
    console.log("Error While Saving Comment", error.message);
    res.json({
      success: false,
      message: "Error While Saving Comment",
    });
  }
};

export const GetAllComments = async (req, res) => {
  try {
    const blogId = req.params.id;
    const comments = await Comment.find({ blogId })
      .sort({ createdAt: -1 })
      .populate("userId", "name email image");
    if (!comments) {
      return res.json({ message: "Comments not found" });
    }
    res.json({
      success: true,
      message: "Comments Fetched Successfully",
      comments,
    });
  } catch (error) {
    console.log("Error While Get ALl Comment", error.message);
    res.json({
      success: false,
      message: "Error While Get All Comment",
    });
  }
};

export const DeletComment = async (req, res) => {
  try {
    const CommentId = req.params.id;
    const UserId = req.user.user._id;
    const comment = await Comment.findById(CommentId);
    if (!comment) {
      return res.json({ message: "Comment not found" });
    }
    if (comment.userId.toString() !== UserId) {
      return res.json({
        message: "You are not authorized to delete this comment",
        success: false,
      });
    }
    await Comment.findByIdAndDelete(comment);
    res.json({ message: "Comment Deleted Successfully", success: true });
  } catch (error) {
    console.log("Error While Deleting Comment", error.message);
    res.json({
      success: false,
      message: "Error While Deleting Comment",
    });
  }
};
