const Post = require('../models/Post');
const Like = require('../models/Like');

class PostController {
  static async getAllPosts(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;

      const posts = await Post.findAll(limit, offset);

      // Check if user has liked posts (if authenticated)
      if (req.user) {
        for (let post of posts) {
          post.isLiked = await Like.checkLike(post.id, req.user.userId);
        }
      }

      res.json({
        success: true,
        posts
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPostById(req, res, next) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Check if user has liked post (if authenticated)
      if (req.user) {
        post.isLiked = await Like.checkLike(post.id, req.user.userId);
      }

      res.json({
        success: true,
        post
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserPosts(req, res, next) {
    try {
      const userId = req.user.userId;
      const posts = await Post.findByUserId(userId);

      res.json({
        success: true,
        posts
      });
    } catch (error) {
      next(error);
    }
  }

  static async createPost(req, res, next) {
    try {
      const { title, content, categoryId } = req.body;
      const userId = req.user.userId;

      const postId = await Post.create(userId, title, content, categoryId);

      res.status(201).json({
        success: true,
        message: 'Post created successfully',
        postId
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePost(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content, categoryId } = req.body;
      const userId = req.user.userId;

      // Check if user owns the post
      const isOwner = await Post.isOwner(id, userId);
      if (!isOwner) {
        return res.status(403).json({ message: 'Not authorized to update this post' });
      }

      const affectedRows = await Post.update(id, title, content, categoryId);

      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.json({
        success: true,
        message: 'Post updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      // Check if user owns the post
      const isOwner = await Post.isOwner(id, userId);
      if (!isOwner) {
        return res.status(403).json({ message: 'Not authorized to delete this post' });
      }

      const affectedRows = await Post.delete(id);

      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.json({
        success: true,
        message: 'Post deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  static async likePost(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      // Check if post exists
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      await Like.add(id, userId);

      const likeCount = await Like.countByPost(id);

      res.json({
        success: true,
        message: 'Post liked successfully',
        likeCount
      });
    } catch (error) {
      if (error.message === 'Already liked') {
        return res.status(400).json({ message: 'You already liked this post' });
      }
      next(error);
    }
  }

  static async unlikePost(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      const affectedRows = await Like.remove(id, userId);

      if (affectedRows === 0) {
        return res.status(400).json({ message: 'Like not found' });
      }

      const likeCount = await Like.countByPost(id);

      res.json({
        success: true,
        message: 'Post unliked successfully',
        likeCount
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;
