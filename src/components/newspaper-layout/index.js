import React from 'react';
import { Link } from 'gatsby';
import './style.scss';

function NewspaperLayout({ children, title }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="newspaper-layout">
      <header className="masthead">
        <div className="meta-info">
          <span className="date">{today}</span>          
        </div>
        <div className="brand">
          <Link to="/">{title || 'The Daily Blog'}</Link>
        </div>
        <div className="edition-info">
          <span>Vol. 1, No. 1</span>
          <span>Late City Edition</span>
        </div>
        <hr className="separator" />
      </header>
      <main className="newspaper-content">{children}</main>
      <footer className="newspaper-footer">
        <p>© {new Date().getFullYear()} The Daily Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default NewspaperLayout;
