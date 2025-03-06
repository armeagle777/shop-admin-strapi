"use strict";
const _ = require("lodash");

const { customersLightDataProps } = require("../utils/constants");

module.exports = () => ({
  async getCustomersLightData(query) {
    try {
      const { pageSize = 5, page = 1 } = query;
      const { populate, fields } = customersLightDataProps;

      const customers = await strapi.entityService.findPage(
        "api::customer.customer",
        {
          populate,
          fields,
          page,
          pageSize,
        }
      );

      return customers;
    } catch (error) {
      console.log("error::::::", error);
      return null;
    }
  },
});
