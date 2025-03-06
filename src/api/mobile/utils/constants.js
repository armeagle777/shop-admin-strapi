const customersLightDataProps = {
  populate: {
    Avatar: {
      fields: ["formats"],
    },
  },
  fields: ["id"],
  sort: ["createdAt:desc"],
};

module.exports = { customersLightDataProps };
