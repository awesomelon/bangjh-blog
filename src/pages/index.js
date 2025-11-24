import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layout';
import NewspaperLayout from '../components/newspaper-layout';
import HeadlinePost from '../components/headline-post';
import PostCard from '../components/post-card';
import Head from '../components/seo';

import Post from '../models/post';

import './index.scss';

function HomePage({ data }) {
  const posts = data.allMarkdownRemark.edges.map(({ node }) => new Post(node));


  return (
    <NewspaperLayout title="The Daily Blog">
      <Head title="방로그" />
      <HeadlinePost post={posts[0]} />
      
      <div className="newspaper-grid">
        <div className="main-column">
          {posts.slice(1).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </NewspaperLayout>
  );
}

export default HomePage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          id
          excerpt(pruneLength: 500, truncate: true)
          frontmatter {

            title
            date(formatString: "YYYY-MM-DD")
          }
          fields {
            slug
          }
        }
      }
    }

    site {
      siteMetadata {
        language
        author {
          name
          bio {
            role
            description
            thumbnail
          }
          social {
            github
            linkedIn
            email
          }
        }
      }
    }
  }
`;
