export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin("graphql").service("extension");

    extensionService.use({
      resolversConfig: {
        "Query.usersPermissionsUser": {
          policies: [
            async (context) => {
              const loggedInUserId = context.state.user.id;
              const targetedUserId = context.args.id
              return loggedInUserId == targetedUserId;
            },
          ],
        },
        "Mutation.updateUsersPermissionsUser": {
          policies: [
            async (context) => {
              const loggedInUserId = context.state.user.id;
              const targetedUserId = context.args.id
              return loggedInUserId == targetedUserId;
            },
          ],
        },
      },
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
