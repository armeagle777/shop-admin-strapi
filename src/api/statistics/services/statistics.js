"use strict";
const _ = require("lodash");

const {
  expenseQueryOpt,
  customersQueryOpt,
  ordersQueryOpt,
  surplusOrdersQueryOpt,
  accessoryOrdersQueryOpt,
  accessoryExpenseQueryOpt,
} = require("../utils/constants");
const { getCurrentYearAndPast11Months } = require("../utils/helpers");

module.exports = () => ({
  async getHomepagePillsStatsData(query) {
    try {
      const nonAccessoryOrders = await strapi.entityService.findMany(
        "api::order.order",
        {
          filters: ordersQueryOpt.filters,
          fields: ordersQueryOpt.fields,
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
          filters: expenseQueryOpt.filters,
          fields: expenseQueryOpt.fields,
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
          filters: customersQueryOpt.filters,
          fields: customersQueryOpt.fields,
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

      const nonAccessoryIncomes = nonAccessoryCharData.map(
        (monthData) => monthData["Զուտ եկամուտ"]
      );

      const meanIncome = _.mean(nonAccessoryIncomes);

      const nonAccessorySurplusOrders = await strapi.entityService.findMany(
        "api::order.order",
        {
          filters: surplusOrdersQueryOpt.filters,
          fields: surplusOrdersQueryOpt.fields,
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
