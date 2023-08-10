"use strict";

/**
 * A set of functions called "actions" for `makeOrderCanceled`
 */

module.exports = {
  makeOrderCanceled: async (ctx, next) => {
    try {
      ctx.body = "ok";
    } catch (error) {
      console.log("err::::::", err);
      ctx.body = err;
    }
  },
};
