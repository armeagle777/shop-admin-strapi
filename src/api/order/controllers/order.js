"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  makeOrderCanceled: async (ctx, next) => {
    try {
      const { body } = ctx.request;
      const { record, newStatus } = { ...body };

      const { key, images, customer, category, shop, ...rest } = {
        ...record,
      };
      const newOrder = { ...rest };
      if (images) {
        newOrder.images = images.data.map((i) => i.id);
      }
      if (category) {
        newOrder.category = category.data.id;
      }
      if (shop) {
        newOrder.shop = shop.data.id;
      }
      newOrder.status = "AVAILABLE";

      const createdOrder = await strapi.entityService.create(
        "api::order.order",
        {
          data: {
            ...newOrder,
          },
        }
      );

      const updateObj = {
        status: newStatus,
      };

      if (newStatus === "CANCELLED") {
        updateObj.cancel_date = new Date();
      } else if (newStatus === "RETURNED") {
        updateObj.return_date = new Date();
      }

      await strapi.entityService.update("api::order.order", key, {
        data: updateObj,
      });
      ctx.send(createdOrder);
    } catch (error) {
      console.log("error::::::", error.message);
      ctx.throw(403, error.message);
    }
  },
}));
