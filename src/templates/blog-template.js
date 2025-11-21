import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../layout';
import NewspaperLayout from '../components/newspaper-layout';
import Head from '../components/seo';
import PostHeader from '../components/post-header';
import PostNavigator from '../components/post-navigator';
import Post from '../models/post';
import PostContent from '../components/post-content';
import Utterances from '../components/utterances';
import { CounterAPI } from 'counterapi';

function BlogTemplate({ data }) {
  const [viewCount, setViewCount] = useState(null);
  const curPost = new Post(data.cur);
  const prevPost = data.prev && new Post(data.prev);
  const nextPost = data.next && new Post(data.next);
  const { siteUrl, comments } = data.site?.siteMetadata;
  const utterancesRepo = comments?.utterances?.repo;
  const counter = new CounterAPI();

  useEffect(() => {
    if (!siteUrl) return;
    const namespace = siteUrl.replace(/(^\w+:|^)\/\//, '');
    const key = curPost.slug.replace(/\//g, '');

    counter.up(namespace, key).then((res) => {
      const count = res.Count;
      setViewCount(count);
    });
  }, [siteUrl, curPost.slug]);

  return (
    <NewspaperLayout title="The Daily Blog">
      <Head title={curPost?.title} description={curPost?.excerpt} />
      <PostHeader post={curPost} viewCount={viewCount} />
      <PostContent html={curPost.html} />
      <PostNavigator prevPost={prevPost} nextPost={nextPost} />
      {utterancesRepo && <Utterances repo={utterancesRepo} path={curPost.slug} />}
    </NewspaperLayout>
  );
}

export default BlogTemplate;

export const pageQuery = graphql`
  query($slug: String, $nextSlug: String, $prevSlug: String) {
    cur: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt(pruneLength: 500, truncate: true)
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        categories
        author
      }
      fields {
        slug
      }
    }

    next: markdownRemark(fields: { slug: { eq: $nextSlug } }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        categories
        author
      }
      fields {
        slug
      }
    }

    prev: markdownRemark(fields: { slug: { eq: $prevSlug } }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        categories
        author
      }
      fields {
        slug
      }
    }

    site {
      siteMetadata {
        siteUrl
        comments {
          utterances {
            repo
          }
        }
      }
    }
  }
`;
