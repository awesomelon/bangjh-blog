import React, { useCallback } from 'react';
import { IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import PlayIcon from '@mui/icons-material/PlayArrowOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import './style.scss';

function IconButtonBar({ links = {} }) {
  console.log(links);

  const IconPicker = useCallback((icon) => {
    const props = { className: 'icon' };
    switch (icon) {
      case 'post':
        return <DescriptionIcon {...props} />;
      case 'demo':
      case 'siteUrl':
        return <PlayIcon {...props} />;
      case 'github':
        return <GitHubIcon {...props} />;
      case 'googlePlay':
        return <AndroidIcon {...props} />;
      case 'appStore':
        return <AppleIcon {...props} />;
      case 'email':
        return <EmailIcon {...props} />;
      case 'linkedIn':
        return <LinkedInIcon {...props} />;
      default:
        return <></>;
    }
  }, []);

  return (
    <>
      {Object.keys(links).map((link, index) => {
        return (
          links[link] && (
            <IconButton
              key={index}
              size="small"
              target="_blank"
              href={`${link === 'email' ? `mailto:` : ``}${links[link]}`}
            >
              {IconPicker(link)}
            </IconButton>
          )
        );
      })}
    </>
  );
}

export default IconButtonBar;
