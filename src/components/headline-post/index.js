import React from 'react';
import { Link } from 'gatsby';
import './style.scss';

function HeadlinePost({ post }) {
  const { slug, title, excerpt, date } = post;

  return (
    <div className="headline-post">
      <Link to={slug} className="headline-link">
        <div className="headline-content">
          <div className="meta">
            <span className="date">{date}</span>

          </div>
          <h1 className="title">{title}</h1>
          <p className="excerpt" dangerouslySetInnerHTML={{ __html: excerpt }} />
        </div>
      </Link>
    </div>
  );
}

export default HeadlinePost;
