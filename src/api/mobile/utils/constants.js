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

module.exports = { customersLightDataProps, customersDataProps };
