
import React from 'react';
import './style.scss';

function PostHeader({ post, viewCount }) {
  return (
    <header className="post-header">


      <h1 className="title">{post.title}</h1>
      <div className="info">
        <div className="author">
          posted by <strong>{post.author}</strong>,
        </div>{' '}
        {post.date}    
      </div>
    </header>
  );
}
export default PostHeader;
