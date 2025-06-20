"use strict";
const _ = require("lodash");

const { getCurrentYearAndPast11Months } = require("../utils/helpers");
const {
  expenseQueryOpt,
  customersQueryOpt,
  ordersQueryOpt,
  surplusOrdersQueryOpt,
  // accessoryOrdersQueryOpt,
  // accessoryExpenseQueryOpt,
} = require("../../statistics/utils/constants");

module.exports = () => ({
  async getHomepagePillsStatsData(query) {
    try {
      const orders = await strapi.documents("api::order.order").findMany({
        filters: ordersQueryOpt.filters,
        fields: ordersQueryOpt.fields,
      });

      // const accessoryOrders = await strapi.entityService.findMany(
      //   "api::order.order",
      //   {
      //     filters: accessoryOrdersQueryOpt.filters,
      //     fields: accessoryOrdersQueryOpt.fields,
      //   }
      // );

      const expenses = await strapi.documents("api::expense.expense").findMany({
        filters: expenseQueryOpt.filters,
        fields: expenseQueryOpt.fields,
      });

      // const accessoryExpenses = await strapi.entityService.findMany(
      //   "api::expense.expense",
      //   {
      //     filters: accessoryExpenseQueryOpt.filters,
      //     fields: accessoryExpenseQueryOpt.fields,
      //   }
      // );

      const customers = await strapi.documents("api::customer.customer").findMany({
        filters: customersQueryOpt.filters,
        fields: customersQueryOpt.fields,
      });

      const charData = getCurrentYearAndPast11Months(expenses, orders);

      // const accessoryCharData = getCurrentYearAndPast11Months(
      //   accessoryExpenses,
      //   accessoryOrders
      // );

      const meanIncome = _.mean(charData.netIncomes);

      const surplusOrders = await strapi.documents("api::order.order").findMany({
        filters: surplusOrdersQueryOpt.filters,
        fields: surplusOrdersQueryOpt.fields,
      });
      const surplus = surplusOrders.reduce((acc, el) => {
        acc += el.net_cost;
        return acc;
      }, 0);

      return {
        ordersCount: orders.length,
        customersCount: customers.length,
        charData,
        // accessoryCharData,
        meanIncome,
        surplus,
      };
    } catch (error) {
      console.log("error::::::", error);
      return null;
    }
  },
});
