module.exports = {
  title: `Bangjh-blog`,
  description: `재호의 개발일기`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://www.bangjh-blog.com`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `awesomelon/bangjh-blog`, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: 'DkAKLHvYsuago83B2I5OyLFInPCW', // Google Analytics Tracking ID
  author: {
    name: `방재호`,
    bio: {
      role: `개발자`,
      description: ['비지니스 성장에 기여하는', '고객의 편의성을 중요시 하는', '동료들과 협업하는'],
      thumbnail: 'profile.gif', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/awesomelon`, // `https://github.com/zoomKoding`,
      linkedIn: ``, // `https://www.linkedin.com/in/jinhyeok-jeong-800871192`,
      email: `awesomelon@naver.com`, // `zoomkoding@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2022.10 ~',
        activity: '개인 블로그 개발 및 운영',
        links: {
          post: '/cs-1',
          github: 'https://github.com/awesomelon/bangjh-blog',
          demo: 'https://www.bangjh-blog.com',
        },
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {},
    ],
  },
};
