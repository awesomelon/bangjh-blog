require('typeface-montserrat');

// Gatsby 브라우저 API를 사용하여 페이지가 새로고침될 때마다 테마를 설정
export const onClientEntry = () => {
  // 브라우저 환경에서만 실행
  if (typeof window !== 'undefined') {
    // 로컬 스토리지에서 테마 설정 가져오기
    const isDarkMode = (() => {
      try {
        const value = window.localStorage.getItem('isDarkMode');
        return value !== null ? JSON.parse(value) : null;
      } catch (e) {
        return null;
      }
    })();

    // 테마 적용
    if (isDarkMode !== null) {
      document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }
};
