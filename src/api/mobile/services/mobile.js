"use strict";
const _ = require("lodash");

const { getCurrentYearAndPast11Months } = require("../utils/helpers");
const {
  nonAccessoryExpenseQueryOpt,
  nonAccessoryCustomersQueryOpt,
  nonAccessoryOrdersQueryOpt,
  nonAccessorySurplusOrdersQueryOpt,
  accessoryOrdersQueryOpt,
  accessoryExpenseQueryOpt,
} = require("../../statistics/utils/constants");

module.exports = () => ({
  async getHomepagePillsStatsData(query) {
    try {
      const nonAccessoryOrders = await strapi.entityService.findMany(
        "api::order.order",
        {
          filters: nonAccessoryOrdersQueryOpt.filters,
          fields: nonAccessoryOrdersQueryOpt.fields,
        }
      );

      const accessoryOrders = await strapi.entityService.findMany(
        "api::order.order",
        {
          filters: accessoryOrdersQueryOpt.filters,
          fields: accessoryOrdersQueryOpt.fields,
        }
      );

      const nonAccessoryExpenses = await strapi.entityService.findMany(
        "api::expense.expense",
        {
          filters: nonAccessoryExpenseQueryOpt.filters,
          fields: nonAccessoryExpenseQueryOpt.fields,
        }
      );

      const accessoryExpenses = await strapi.entityService.findMany(
        "api::expense.expense",
        {
          filters: accessoryExpenseQueryOpt.filters,
          fields: accessoryExpenseQueryOpt.fields,
        }
      );

      const nonAccessoryCustomers = await strapi.entityService.findMany(
        "api::customer.customer",
        {
          filters: nonAccessoryCustomersQueryOpt.filters,
          fields: nonAccessoryCustomersQueryOpt.fields,
        }
      );

      const nonAccessoryCharData = getCurrentYearAndPast11Months(
        nonAccessoryExpenses,
        nonAccessoryOrders
      );

      const accessoryCharData = getCurrentYearAndPast11Months(
        accessoryExpenses,
        accessoryOrders
      );

      const meanIncome = _.mean(nonAccessoryCharData.netIncomes);

      const nonAccessorySurplusOrders = await strapi.entityService.findMany(
        "api::order.order",
        {
          filters: nonAccessorySurplusOrdersQueryOpt.filters,
          fields: nonAccessorySurplusOrdersQueryOpt.fields,
        }
      );
      const surplus = nonAccessorySurplusOrders.reduce((acc, el) => {
        acc += el.net_cost;
        return acc;
      }, 0);

      return {
        ordersCount: nonAccessoryOrders.length,
        customersCount: nonAccessoryCustomers.length,
        nonAccessoryCharData,
        accessoryCharData,
        meanIncome,
        surplus,
      };
    } catch (error) {
      console.log("error::::::", error);
      return null;
    }
  },
});
