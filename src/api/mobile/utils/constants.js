const customersLightDataProps = {
  populate: {
    Avatar: {
      fields: ["formats"],
    },
  },
  fields: ["id"],
  sort: ["createdAt:desc"],
};

const customersDataProps = {
  populate: {
    Avatar: {
      fields: ["formats"],
    },
    addresses: true,
    contacts: true,
  },
  fields: ["id", "first_name", "last_name", "phone_number"],
  sort: ["createdAt:desc"],
};

const ordersDataProps = {
  populate: {
    shop: {
      fields: ["id", "name", "url"],
      populate: {
        logo: {
          fields: ["formats"],
        },
      },
    },
    customer: {
      fields: ["id", "first_name", "last_name", "phone_number"],
      populate: {
        Avatar: {
          fields: ["formats"],
        },
        addresses: true,
        contacts: true,
      },
    },
    category: {
      fields: ["id", "name"],
    },
    images: {
      fields: ["formats"],
    },
    address: true,
  },
  fields: [
    "id",
    "tracking_id",
    "cancel_date",
    "received_date",
    "return_date",
    "deliver_date",
    "description",
    "name",
    "net_cost",
    "selling_price",
    "reference_url",
    "status",
    "order_date",
  ],
  sort: ["createdAt:desc"],
};

module.exports = {
  customersLightDataProps,
  customersDataProps,
  ordersDataProps,
};
