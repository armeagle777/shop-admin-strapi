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
  ],
};
