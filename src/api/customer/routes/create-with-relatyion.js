module.exports = {
  routes: [
    {
      method: "POST",
      path: "/customers/create-with-relation",
      handler: "customer.createWithRelations",
    },
  ],
};
