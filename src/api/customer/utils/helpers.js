const formatSearchCustomersFilters = (words, trimedSearchString) => {
  switch (words?.length) {
    case 1:
      return {
        $or: [
          { first_name: { $contains: words[0] } },
          { last_name: { $contains: words[0] } },
          { phone_number: { $contains: words[0] } },
        ],
      };

    case 2:
      return {
        $or: [
          { first_name: { $containsi: trimedSearchString } },
          { last_name: { $containsi: trimedSearchString } },
          {
            $and: [
              { first_name: { $containsi: words[0] } },
              { last_name: { $containsi: words[1] } },
            ],
          },
          {
            $and: [
              { first_name: { $containsi: words[1] } },
              { last_name: { $containsi: words[0] } },
            ],
          },
          {
            $and: [
              { first_name: { $containsi: words[0] } },
              { phone_number: { $containsi: words[1] } },
            ],
          },
          {
            $and: [
              { last_name: { $containsi: words[0] } },
              { phone_number: { $containsi: words[1] } },
            ],
          },
        ],
      };
    default:
      return { id: { $eq: null } };
  }
};

const formatFindPageResult = (response) => {
  const { results, pagination } = { ...response };
  return {
    data: results || [],
    meta: { pagination } || {},
  };
};

module.exports = { formatSearchCustomersFilters, formatFindPageResult };
