"use strict";
const _ = require("lodash");
const { ordersDataProps } = require("../utils/constants");
const { formatOrdersFilters } = require("../utils/helpers");

module.exports = () => ({
  async getOrdersData(query) {
    try {
      const { pageSize = 10, page = 1, orderBy, status } = query;
      const { populate, fields, sort } = ordersDataProps;

      const filters = formatOrdersFilters({ status });

      const orders = await strapi.entityService.findPage("api::order.order", {
        populate,
        fields,
        page,
        pageSize,
        filters,
        sort: orderBy ? [orderBy] : sort,
      });

      return orders;
    } catch (error) {
      console.log("error::::::", error);
      return null;
    }
  },
});
