const accessoryExpenseIds = [32, 39];
const accessoryCategoryIds = [74];

const nonAccessoryOrdersQueryOpt = {
  fields: ["status", "net_cost", "selling_price", "order_date"],
  filters: {
    category: {
      id: {
        $notIn: accessoryCategoryIds,
      },
    },
    status: {
      $notIn: ["CANCELLED", "RETURNED"],
    },
    isActive: {
      $eq: true,
    },
  },
};

const accessoryOrdersQueryOpt = {
  fields: ["status", "net_cost", "selling_price", "order_date"],
  filters: {
    category: {
      id: {
        $in: accessoryCategoryIds,
      },
    },
    status: {
      $notIn: ["CANCELLED", "RETURNED"],
    },
    isActive: {
      $eq: true,
    },
  },
};

const nonAccessorySurplusOrdersQueryOpt = {
  fields: ["net_cost"],
  filters: {
    category: {
      id: {
        $notIn: accessoryCategoryIds,
      },
    },
    status: {
      $in: ["AVAILABLE", "ORDERED"],
    },
    isActive: {
      $eq: true,
    },
  },
};

const nonAccessoryExpenseQueryOpt = {
  fields: ["amount", "expense_date"],
  filters: {
    direction: {
      id: {
        $notIn: accessoryExpenseIds,
      },
    },
    isActive: {
      $eq: true,
    },
  },
};

const accessoryExpenseQueryOpt = {
  fields: ["amount", "expense_date"],
  filters: {
    direction: {
      id: {
        $in: accessoryExpenseIds,
      },
    },
    isActive: {
      $eq: true,
    },
  },
};

const nonAccessoryCustomersQueryOpt = {
  fields: ["id"],
  filters: {
    isActive: {
      $eq: true,
    },
  },
};

module.exports = {
  accessoryExpenseIds,
  accessoryCategoryIds,
  accessoryOrdersQueryOpt,
  accessoryExpenseQueryOpt,
  nonAccessoryOrdersQueryOpt,
  nonAccessoryExpenseQueryOpt,
  nonAccessoryCustomersQueryOpt,
  nonAccessorySurplusOrdersQueryOpt,
};
