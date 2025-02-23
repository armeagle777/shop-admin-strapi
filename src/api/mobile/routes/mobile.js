module.exports = {
  routes: [
    {
      method: "GET",
      path: "/mobile/homepage/pills",
      handler: "mobile.getHomepagePillsStats",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
