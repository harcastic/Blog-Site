import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const response = await postsAPI.getUserPosts();
      setPosts(response.data.posts);
    } catch (err) {
      setError('Failed to load your posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await postsAPI.delete(postId);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <div className="loading">Loading your posts...</div>;
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <button onClick={() => navigate('/create-post')} className="btn btn-primary">
          Create New Post
        </button>
      </div>

      <p style={{ color: '#7f8c8d', marginBottom: '2rem' }}>
        Welcome back, {user?.username}! Here are your posts.
      </p>

      {error && <div className="error-message">{error}</div>}

      {posts.length === 0 ? (
        <div className="empty-state">
          <p>You haven't created any posts yet.</p>
          <button onClick={() => navigate('/create-post')} className="btn btn-primary">
            Create Your First Post
          </button>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="card">
            <h2>{post.title}</h2>
            <p>{post.content.substring(0, 200)}...</p>
            <div className="post-meta">
              <span>{formatDate(post.createdAt)}</span>
              {post.category_name && (
                <span className="category-badge">{post.category_name}</span>
              )}
              <span>❤️ {post.like_count || 0}</span>
              <span>💬 {post.comment_count || 0}</span>
            </div>
            <div className="post-actions">
              <button onClick={() => navigate(`/post/${post.id}`)} className="btn btn-primary">
                View
              </button>
              <button onClick={() => handleEdit(post.id)} className="btn btn-secondary">
                Edit
              </button>
              <button onClick={() => handleDelete(post.id)} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
