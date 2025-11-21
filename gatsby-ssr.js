import React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="google-fonts-preconnect"
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />,
    <link
      key="google-fonts-preconnect-crossorigin"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="true"
    />,
    <link
      key="google-fonts"
      href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Playfair+Display:wght@400;700;900&display=swap"
      rel="stylesheet"
    />,
    <script
      key="theme-script"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // 초기 테마를 설정하는 스크립트
            function setTheme() {
              try {
                const isDarkMode = localStorage.getItem('isDarkMode');
                if (isDarkMode !== null) {
                  document.documentElement.setAttribute('data-theme', JSON.parse(isDarkMode) ? 'dark' : 'light');
                } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {}
            }

            // 깜빡임 방지를 위한 스타일 추가
            const style = document.createElement('style');
            style.innerHTML = 'html { visibility: hidden; }';
            style.id = 'gatsby-theme-style-loader';
            document.head.appendChild(style);

            // DOM이 로드되면 테마 설정 및 깜빡임 방지 스타일 제거
            document.addEventListener('DOMContentLoaded', function() {
              setTheme();
              const themeStyle = document.getElementById('gatsby-theme-style-loader');
              if (themeStyle) {
                themeStyle.remove();
              }
              document.documentElement.style.visibility = 'visible';
            });
          })();
        `,
      }}
    />,
  ]);
};
