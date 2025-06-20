"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const dayjs = require('dayjs')

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  makeOrderCanceled: async (ctx, next) => {
    try {
      const { body } = ctx.request;
      const { record, newStatus } = { ...body };

      const { key, images, customer, category, shop, ...rest } = {
        ...record,
      };
      const newOrder = { ...rest };
      if (images && images.data) {
        
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
      const currentDate = dayjs(new Date()).format('YYYY-MM-DD');
      if (newStatus === "CANCELLED") {
        updateObj.cancel_date = currentDate;
      } else if (newStatus === "RETURNED") {
        updateObj.return_date = currentDate;
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
