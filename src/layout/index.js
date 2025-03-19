import React, { useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PageHeader from '../components/page-header';
import PageFooter from '../components/page-footer';
import ThemeSwitch from '../components/theme-switch';
import { getValueFromLocalStorage } from '../utils/localStorage';
import './style.scss';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author {
            name
            social {
              github
            }
          }
        }
      }
    }
  `);
  const { title, author } = data.site.siteMetadata;

  // 클라이언트 사이드에서 테마 설정 복원
  useEffect(() => {
    const isDarkMode = getValueFromLocalStorage('isDarkMode');
    if (isDarkMode !== null && isDarkMode !== undefined) {
      document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  return (
    <div className="page-wrapper">
      <PageHeader siteTitle={title || `Title`} />
      <main className="page-content">{children}</main>
      <PageFooter
        author={author.name || `Author`}
        githubUrl={author.social?.github || `https://github.com/awesomelon`}
      />
      <ThemeSwitch />
    </div>
  );
};

export default Layout;
