"use strict";

module.exports = {
  getHomepagePillsStats: async (ctx, next) => {
    try {
      ctx.body = await strapi
        .service("api::mobile.statistics")
        .getHomepagePillsStatsData();
    } catch (err) {
      ctx.body = err;
    }
  },
};
