"use strict";
const _ = require("lodash");

const {
  customersLightDataProps,
  customersDataProps,
} = require("../utils/constants");

module.exports = () => ({
  async getCustomersLightData(query) {
    try {
      const { pageSize = 5, page = 1, orderBy } = query;
      const { populate, fields, sort } = customersLightDataProps;

      const customers = await strapi.entityService.findPage(
        "api::customer.customer",
        {
          populate,
          fields,
          page,
          pageSize,
          sort: orderBy ? [orderBy] : sort,
        }
      );

      return customers;
    } catch (error) {
      console.log("error::::::", error);
      return null;
    }
  },
  async getCustomersData(query) {
    try {
      const { pageSize = 5, page = 1, orderBy } = query;
      const { populate, fields, sort } = customersDataProps;

      const customers = await strapi.entityService.findPage(
        "api::customer.customer",
        {
          populate,
          fields,
          page,
          pageSize,
          sort: orderBy ? [orderBy] : sort,
        }
      );

      return customers;
    } catch (error) {
      console.log("error::::::", error);
      return null;
    }
  },
});
