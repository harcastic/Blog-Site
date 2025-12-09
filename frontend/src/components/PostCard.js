import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="card post-card" onClick={handleClick}>
      <h2>{post.title}</h2>
      <p>{post.content.substring(0, 200)}...</p>
      <div className="post-meta">
        <span>By {post.username}</span>
        {post.category_name && (
          <span className="category-badge">{post.category_name}</span>
        )}
        <span>{formatDate(post.createdAt)}</span>
        <span>❤️ {post.like_count || 0}</span>
        <span>💬 {post.comment_count || 0}</span>
      </div>
    </div>
  );
};

export default PostCard;
