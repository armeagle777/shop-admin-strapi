module.exports = {
  routes: [
    {
      method: "GET",
      path: "/statistics/homepage/pills",
      handler: "statistics.getHomepagePillsStats",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
