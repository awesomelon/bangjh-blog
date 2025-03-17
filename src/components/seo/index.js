import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

export const Head = ({ description, title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author {
              name
            }
            ogImage
            gSearch
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={site.siteMetadata.ogImage} />
      <meta name="google-site-verification" content={site.siteMetadata.gSearch} />
      {/* <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1367328009908538"
        crossOrigin="anonymous"
      /> */}
    </>
  );
};

export default Head;
