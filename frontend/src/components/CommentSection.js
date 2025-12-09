import React, { useState } from 'react';
import { commentsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CommentSection = ({ postId, initialComments }) => {
  const [comments, setComments] = useState(initialComments || []);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError('');

    try {
      await commentsAPI.create(postId, { content });
      
      // Refresh comments
      const response = await commentsAPI.getByPost(postId);
      setComments(response.data.comments);
      setContent('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;

    try {
      await commentsAPI.delete(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete comment');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="comment-section">
      <h3>Comments ({comments.length})</h3>

      {isAuthenticated && (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Write a comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              rows="3"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      )}

      <div style={{ marginTop: '2rem' }}>
        {comments.length === 0 ? (
          <p className="empty-state">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <div>
                  <span className="comment-author">{comment.username}</span>
                  <span className="comment-date" style={{ marginLeft: '1rem' }}>
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                {user && user.id === comment.user_id && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="btn btn-danger"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                  >
                    Delete
                  </button>
                )}
              </div>
              <p>{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
