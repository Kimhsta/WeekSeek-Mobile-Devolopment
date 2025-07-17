import 'dotenv/config';

export default {
  expo: {
    name: 'frontend_reactnative',
    slug: 'frontend_reactnative',
    version: '1.0.0',
    extra: {
      API_URL: process.env.API_URL,
    },
  },
};
