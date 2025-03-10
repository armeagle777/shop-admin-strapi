"use strict";

module.exports = {
  getCustomersLightData: async (ctx, next) => {
    try {
      ctx.body = await strapi
        .service("api::mobile.customers")
        .getCustomersLightData(ctx.request.query);
    } catch (err) {
      ctx.body = err;
    }
  },
  getCustomersData: async (ctx, next) => {
    try {
      ctx.body = await strapi
        .service("api::mobile.customers")
        .getCustomersData(ctx.request.query);
    } catch (err) {
      ctx.body = err;
    }
  },
};
