module.exports = {
  title: `방로그`,
  description: `재호의 개발일기`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://www.bangjh-blog.com`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `awesomelon/bangjh-blog`, // `zoomkoding/zoomkoding-gatsby-blog`,
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
      // ========================================================
      {
        title: '해외 커머스 플랫폼 구축 (미니파이)',
        description:
          '해외에서 온라인 비즈니스를 시작하고자 하는 기업을 위한 파운데이션 패키지를 제공하는 서비스. 파운데이션 패키지는 온-오프라인 비즈니스에 필수적인 채널 빌더, 결제, 물류, 마케팅 등 4가지 솔루션으로 구성되어 있습니다.',
        techStack: [
          'Tencent Cloud',
          'TKE (Tencent Kubernetes Engine)',
          'CKafka (Tencent Cloud Kafka)',
          'jenkins',
          'ArgoCD',

          'ELK',
          'NodeJs',
          'NestJs',
          'expressJs',
          'Redis',
          'MongoDB',
          'React',
          'NextJs',
        ],
      },
      {
        title: '세관 자동 신고 시스템 구축',
        description:
          '주문 정보에 따른 각 지역 세관에 자동으로 신고되는 시스템 구축. 일렉트로 DB에서 데이터를 긁어오는 데스크탑 앱을 구축 후, 특정 폴더에 긁어온 데이터를 XML 파일로 변환. 변환된 XML 파일을 세관에 전송하는 시스템을 구축했습니다.',
        techStack: ['SOAP', 'XML', 'Electron'],
      },
    ],
  },
};
