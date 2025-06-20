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
      const nonAccessoryOrders = await strapi.documents("api::order.order").findMany({
        filters: ordersQueryOpt.filters,
        fields: ordersQueryOpt.fields,
      });

      const accessoryOrders = await strapi.documents("api::order.order").findMany({
        filters: accessoryOrdersQueryOpt.filters,
        fields: accessoryOrdersQueryOpt.fields,
      });

      const nonAccessoryExpenses = await strapi.documents("api::expense.expense").findMany({
        filters: expenseQueryOpt.filters,
        fields: expenseQueryOpt.fields,
      });

      const accessoryExpenses = await strapi.documents("api::expense.expense").findMany({
        filters: accessoryExpenseQueryOpt.filters,
        fields: accessoryExpenseQueryOpt.fields,
      });

      const nonAccessoryCustomers = await strapi.documents("api::customer.customer").findMany({
        filters: customersQueryOpt.filters,
        fields: customersQueryOpt.fields,
      });

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

      const nonAccessorySurplusOrders = await strapi.documents("api::order.order").findMany({
        filters: surplusOrdersQueryOpt.filters,
        fields: surplusOrdersQueryOpt.fields,
      });
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
