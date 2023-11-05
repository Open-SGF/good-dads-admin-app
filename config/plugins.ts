module.exports = ({ env }) => ({
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 300000
        },
      },
    },
  },
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: env('NODE_ENV') === 'development',
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        introspection: env('NODE_ENV') === 'development',
        tracing: false,
      },
    },
  },
  "apollo-sandbox": {
    enabled: env('NODE_ENV') === 'development',
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', '127.0.0.1'),
        port: env('SMTP_PORT', 1025),
        ignoreTLS: true,
      },
    },
  },
  'gooddads-reporting': {
    enabled: true,
    resolve: './src/plugins/gooddads-reporting',
  },
});
