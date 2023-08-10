module.exports = {
  routes: [
    {
      method: "POST",
      path: "/orders/make-order-canceled",
      handler: "order.makeOrderCanceled",
    },
  ],
};
