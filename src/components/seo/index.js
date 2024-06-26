import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

function Seo({ description, title }) {
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
    <Helmet
      htmlAttributes={{ lang: 'ko' }}
      title={title}
      defaultTitle={site.siteMetadata.title}
      meta={[
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:site_title`,
          content: title,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: 'og:author',
          content: site.siteMetadata.author.name,
        },
        {
          property: 'og:image',
          content: site.siteMetadata.ogImage,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: 'google-site-verification',
          content: site.siteMetadata.gSearch,
        },
      ]}
    >
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1367328009908538"
        crossorigin="anonymous"
      ></script>
    </Helmet>
  );
}

export default Seo;
