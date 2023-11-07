module.exports = {
  title: `방로그`,
  description: `재호의 개발일기`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://j-ho.dev`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `awesomelon/bangjh-blog`,
    },
  },
  gSearch: 'Ru_ZXmzzTdp6QqzkVt7fgTOZAz82h8VQ0O6T6TnYTak',
  ga: '337776443', // Google Analytics Tracking ID
  author: {
    name: `방재호`,
    bio: {
      role: `Software Engineer`,
      description: ['비지니스 성장에 기여하는', '클린 코드를 지향하는', '동료들과 협업하는'],
      thumbnail: 'profile.gif', // Path to the image in the 'asset' folder
    },
    social: {
      github: ``, // `https://github.com/zoomKoding`,
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
        date: '2020.01 ~',
        activity: '아이엠폼 재직중 (Software Engineer)',
        links: {
          siteUrl: 'https://imform.co.kr',
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
      {
        title: '클라우드 환경을 사내망으로 마이그레이션',
        description:
          '클라우드 비용 절감을 위한 개발 환경의 클라우드(Tencent Cloud, AWS)를 사내망으로 마이그레이션하는 작업을 담당하였습니다',
        techStack: ['Docker Swarm', 'Portainer', 'Drone CI', 'Nexus'],
        thumbnailUrl: 'ops.webp',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
    ],
  },
};
