"use strict";

/**
 * offer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::offer.offer", ({ strapi }) => ({
  async deleteAll(ctx) {
    // console.log(ctx);
    // console.log(ctx.state.user);
    const userId = ctx.state.user.id;
    const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      userId,
      { populate: ["offers"] }
    );
    // console.log(user);
    for (let i = 0; i < user.offers.length; i++) {
      const offer = user.offers[i];
      await strapi.entityService.delete("api::offer.offer", offer.id);
    }

    try {
      return "ok";
    } catch (error) {
      ctx.response.status = 500;
      return { message: error.message };
    }
  },
}));
