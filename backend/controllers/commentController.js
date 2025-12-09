const Comment = require('../models/Comment');
const Post = require('../models/Post');

class CommentController {
  static async getCommentsByPost(req, res, next) {
    try {
      const { postId } = req.params;

      const comments = await Comment.findByPostId(postId);

      res.json({
        success: true,
        comments
      });
    } catch (error) {
      next(error);
    }
  }

  static async createComment(req, res, next) {
    try {
      const { postId } = req.params;
      const { content } = req.body;
      const userId = req.user.userId;

      // Check if post exists
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const commentId = await Comment.create(postId, userId, content);

      res.status(201).json({
        success: true,
        message: 'Comment added successfully',
        commentId
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteComment(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      // Check if user owns the comment
      const isOwner = await Comment.isOwner(id, userId);
      if (!isOwner) {
        return res.status(403).json({ message: 'Not authorized to delete this comment' });
      }

      const affectedRows = await Comment.delete(id);

      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      res.json({
        success: true,
        message: 'Comment deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
