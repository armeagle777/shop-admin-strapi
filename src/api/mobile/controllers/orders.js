"use strict";

module.exports = {
  getOrdersData: async (ctx, next) => {
    try {
      ctx.body = await strapi
        .service("api::mobile.orders")
        .getOrdersData(ctx.request.query);
    } catch (err) {
      ctx.body = err;
    }
  },
};
