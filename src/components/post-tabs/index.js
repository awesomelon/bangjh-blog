import React, { useMemo } from 'react';
import { Tabs, Tab } from '@mui/material';
import PostCardColumn from '../post-card-column';
import { POST_COUNT } from '../../constants';
import './style.scss';

function PostTabs({ tabIndex, onChange, tabs, posts, showMoreButton }) {
  const tabPosts = useMemo(() => {
    if (tabs[tabIndex] === 'All') return posts;
    return posts.filter((post) => post.categories.includes(tabs[tabIndex]));
  }, [posts, tabs, tabIndex]);

  return (
    <div className="post-tabs-wrapper">
      <div className="post-tabs">
        <Tabs
          className="mui-tabs"
          value={tabIndex}
          onChange={onChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((title, index) => (
            <Tab label={title} key={index} />
          ))}
        </Tabs>
      </div>
      <PostCardColumn
        posts={showMoreButton ? tabPosts.slice(0, POST_COUNT) : tabPosts}
        showMoreButton={showMoreButton && tabPosts.length > POST_COUNT}
        moreUrl={`posts/${tabIndex === 0 ? '' : tabs[tabIndex]}`}
      />
    </div>
  );
}
export default PostTabs;
