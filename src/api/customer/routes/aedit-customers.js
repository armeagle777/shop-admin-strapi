module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/customers/edit-customers/:customerId",
      handler: "customer.editCustomers",
    },
    {
      method: "GET",
      path: "/customers/search",
      handler: "customer.search",
    },
  ],
};
