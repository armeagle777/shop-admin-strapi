"use strict";

const {
  formatSearchCustomersFilters,
  formatFindPageResult,
} = require("../utils/helpers");

/**
 * customer service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::customer.customer", ({ strapi }) => ({
  async search(query) {
    try {
      const { query: searchString } = query;

      if (!searchString) {
        return null;
      }

      const trimedSearchString = searchString?.trim();
      const words = trimedSearchString.split(/\s+/);
      const filters = formatSearchCustomersFilters(words, trimedSearchString);

      const response = await strapi.entityService.findPage(
        "api::customer.customer",
        { filters, populate: "*" }
      );

      const customers = formatFindPageResult(response);

      return customers;
    } catch (error) {
      console.log("ERROR", error);
      return null;
    }
  },
}));
