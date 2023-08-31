"use strict";

/**
 * A set of functions called "actions" for `editCustomers`
 */

module.exports = {
  editCustomers: async (ctx, next) => {
    try {
      ctx.body = "ok";
    } catch (err) {
      ctx.body = err;
    }
  },
};
