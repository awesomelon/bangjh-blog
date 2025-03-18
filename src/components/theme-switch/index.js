import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { getValueFromLocalStorage, setValueToLocalStorage } from '../../utils/localStorage';
import './style.scss';

function ThemeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined') {
      const savedMode = getValueFromLocalStorage('isDarkMode');
      // 저장된 값이 없으면 시스템 설정 확인
      if (savedMode === null || savedMode === undefined) {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return savedMode;
    }
    return false;
  });

  useEffect(() => {
    setValueToLocalStorage('isDarkMode', isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div className="dark-mode-button-wrapper">
      <IconButton className="dark-mode-button" onClick={() => setIsDarkMode((isDark) => !isDark)}>
        {isDarkMode ? (
          <LightModeIcon className="dark-mode-icon" fontSize="large" />
        ) : (
          <DarkModeIcon className="dark-mode-icon" fontSize="large" />
        )}
      </IconButton>
    </div>
  );
}

export default ThemeSwitch;
