"use strict";
const _ = require("lodash");
const { ordersDataProps } = require("../utils/constants");

module.exports = () => ({
  async getOrdersData(query) {
    try {
      const { pageSize = 10, page = 1, orderBy, searchQuery } = query;
      const { populate, fields, sort } = ordersDataProps;

      const orders = await strapi.entityService.findPage("api::order.order", {
        populate,
        fields,
        page,
        pageSize,
        // filters,
        sort: orderBy ? [orderBy] : sort,
      });

      return orders;
    } catch (error) {
      console.log("error::::::", error);
      return null;
    }
  },
});
