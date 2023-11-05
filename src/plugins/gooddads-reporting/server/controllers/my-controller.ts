import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('gooddads-reporting')
      .service('myService')
      .getWelcomeMessage();
  },
});
