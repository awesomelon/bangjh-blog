import { Link, StaticQuery, graphql } from 'gatsby';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import Post from '../../models/post';
import PostSearch from '../post-search';
import './style.scss';

function PageHeader({ siteTitle }) {
  return (
    <StaticQuery
      query={graphql`
        query SearchIndexQuery {
          allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
            edges {
              node {
                frontmatter {
                  title
                  categories
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `}
      render={(data) => (
        <header className="page-header-wrapper">
          <div className="page-header">
            <div className="front-section">
              <Link className="link" to="/">
                {siteTitle}
              </Link>
            </div>
            <div className="trailing-section">
              {/* <Link className="link" to="https://resume-j-ho.netlify.app">
                Resume
              </Link> */}
              <Link className="link" to="https://github.com/awesomelon">
                <GitHubIcon />
              </Link>
              <PostSearch
                posts={data.allMarkdownRemark.edges.map(({ node }) => new Post(node, true))}
              />
            </div>
          </div>
        </header>
      )}
    />
  );
}

export default PageHeader;
