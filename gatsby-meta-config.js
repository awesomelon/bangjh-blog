module.exports = {
  title: `방로그`,
  description: `재호의 개발일기`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://j-ho.io`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `awesomelon/bangjh-blog`,
    },
  },
  gSearch: '5LI5QQqvrdf89wtBzZJFaNoF-GaI5lphHVTK-Qnw9vM',
  ga: 'G-5E07T6SWNH', // Google Analytics Tracking ID
  ads: 'ca-pub-1367328009908538',
  author: {
    name: `j-ho`,
    bio: {
      role: `Software Engineer`,
      description: ['비지니스 성장에 기여하는', '클린 코드를 지향하는', '동료들과 협업하는'],
      thumbnail: '',
    },
    social: {
      github: `https://github.com/awesomelon`,
      linkedIn: ``,
      email: `awesomelon@naver.com`,
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
          siteUrl: '',
        },
      },
      // ========================================================
      {
        title: '클라우드 환경을 사내망으로 마이그레이션',
        description:
          '클라우드 비용 절감을 위한 개발 환경의 클라우드(Tencent Cloud, AWS)를 사내망으로 마이그레이션하는 작업을 담당',
        techStack: ['Docker Swarm', 'Portainer', 'Drone CI', 'Nexus'],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
          siteUrl: 'https://charmed-spatula-d56.notion.site/e3fbce69effd4143844f2e23edbd2f51?pvs=4',
        },
      },
      {
        title: '[PIXVAS] 이미지 생성/편집 AI 서비스',
        description:
          '오픈소스인 Stable diffusion을 기반으로 이미지 생성 및 편집을 손쉽게 할 수 있는 서비스에 파트장으로 개발에 참여',
        techStack: [
          'Stable diffusion',
          'Segmentation anything',
          'Tencent Cloud',
          'NestJs',
          'MongoDB',
          'Jenkins',
          'Apache Kafka',
          'FastAPI',
          'React',
          'zustand',
          'styled-component',
          'antd',
          'swr',
          'Typescript',
        ],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
          siteUrl:
            'https://charmed-spatula-d56.notion.site/PIXVAS-AI-37970c6f71b945229aa4cb2f82f45506?pvs=4',
        },
      },
      {
        title: '[TAGNITY] 인증기반 커뮤니티 생성 플랫폼',
        description:
          '누구나 커뮤니티 비지니스를 영위할 수 있도록 필요한 환경을 제공하는 플랫폼을 제작하는 프로젝트에 참여',
        techStack: [
          'Tencent Cloud',
          'NestJs',
          'Code Push',
          'MongoDB',
          'Jenkins',
          'Apache Kafka',
          'React-Native',
          'recoil',
          'styled-component',
          'react-native-ui',
          'swr',
          'Typescript',
        ],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
          siteUrl:
            'https://charmed-spatula-d56.notion.site/TAGNITY-c76a38f06ecc488eab1351365c9e1503?pvs=4',
        },
      },
    ],
  },
};
