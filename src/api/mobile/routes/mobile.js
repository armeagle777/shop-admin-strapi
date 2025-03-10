module.exports = {
  routes: [
    {
      method: "GET",
      path: "/mobile/homepage/pills",
      handler: "statistics.getHomepagePillsStats",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/mobile/customers/light",
      handler: "customers.getCustomersLightData",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/mobile/customers",
      handler: "customers.getCustomersData",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/mobile/orders",
      handler: "orders.getOrdersData",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
