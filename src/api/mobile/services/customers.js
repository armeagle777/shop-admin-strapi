"use strict";
const _ = require("lodash");

const {
  customersLightDataProps,
  customersDataProps,
} = require("../utils/constants");
const { formatSearchCustomersFilters } = require("../utils/helpers");

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
      const { pageSize = 5, page = 1, orderBy, searchQuery } = query;
      const { populate, fields, sort } = customersDataProps;

      const trimedSearchString = searchQuery?.trim();
      const words = trimedSearchString?.split(/\s+/);

      const filters = formatSearchCustomersFilters(words, trimedSearchString);

      const customers = await strapi.entityService.findPage(
        "api::customer.customer",
        {
          populate,
          fields,
          page,
          pageSize,
          filters,
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
