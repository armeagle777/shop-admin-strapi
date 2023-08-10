"use strict";

/**
 * A set of functions called "actions" for `createWithRealtions`
 */

module.exports = {
  createWithRelation: async (ctx, next) => {
    try {
      ctx.body = "ok";
    } catch (err) {
      ctx.body = err;
    }
  },
};
