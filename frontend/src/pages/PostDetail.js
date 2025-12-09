import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsAPI, commentsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import CommentSection from '../components/CommentSection';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await postsAPI.getById(id);
      const postData = response.data.post;
      setPost(postData);
      setIsLiked(postData.isLiked || false);
    } catch (err) {
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await commentsAPI.getByPost(id);
      setComments(response.data.comments);
    } catch (err) {
      console.error('Failed to load comments');
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      if (isLiked) {
        await postsAPI.unlike(id);
        setPost({ ...post, like_count: post.like_count - 1 });
        setIsLiked(false);
      } else {
        await postsAPI.like(id);
        setPost({ ...post, like_count: post.like_count + 1 });
        setIsLiked(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update like');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await postsAPI.delete(id);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (error || !post) {
    return (
      <div className="container">
        <div className="error-message">{error || 'Post not found'}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="card">
          <h1>{post.title}</h1>

          <div className="post-meta" style={{ marginTop: '1rem' }}>
            <span>By {post.username}</span>
            {post.category_name && (
              <span className="category-badge">{post.category_name}</span>
            )}
            <span>{formatDate(post.createdAt)}</span>
          </div>

          <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
            {post.content}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={handleLike}
              className={`like-button ${isLiked ? 'liked' : ''}`}
            >
              ❤️ {post.like_count || 0} Likes
            </button>

            {user && user.id === post.user_id && (
              <>
                <button
                  onClick={() => navigate(`/edit-post/${post.id}`)}
                  className="btn btn-secondary"
                >
                  Edit Post
                </button>
                <button onClick={handleDelete} className="btn btn-danger">
                  Delete Post
                </button>
              </>
            )}
          </div>
        </div>

        <CommentSection postId={id} initialComments={comments} />
      </div>
    </div>
  );
};

export default PostDetail;
