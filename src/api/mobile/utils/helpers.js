const {
  isAfter,
  isBefore,
  isEqual,
  startOfMonth,
  endOfMonth,
} = require("date-fns");
const delve = require("dlv");

function getCurrentYearAndPast11Months(expenses, orders) {
  const months = [
    "Հուն",
    "Փետ",
    "Մրտ",
    "Ապր",
    "Մայ",
    "Հնս",
    "Հլս",
    "Օգս",
    "Սեպ",
    "Հոկ",
    "Նոյ",
    "Դեկ",
  ];

  const currentDate = new Date();
  const yerevanOffset = 4 * 60; // 4 hours in minutes
  const yerevanDate = new Date(
    currentDate.getTime() + yerevanOffset * 60 * 1000
  );

  let currentYear = yerevanDate.getFullYear();
  let currentMonth = yerevanDate.getMonth();

  const monthsData = {
    months: [],
    costPrices: [],
    expenses: [],
    profits: [],
    netIncomes: [],
  };

  for (let i = 0; i < 12; i++) {
    const monthName = months[currentMonth];
    const firstDayOfMonth = new Date(
      startOfMonth(new Date(currentYear, currentMonth, 1)).getTime() +
        yerevanOffset * 60 * 1000
    );

    const lastDayOfMonth = new Date(
      endOfMonth(new Date(currentYear, currentMonth, 1)).getTime() +
        yerevanOffset * 60 * 1000
    );

    const currentMonthOrders = orders?.filter((item) => {
      const itemDate = new Date(item?.order_date);

      return (
        item?.attributes?.status !== "CANCELLED" &&
        item?.attributes?.status !== "RETURNED" &&
        (isEqual(itemDate, firstDayOfMonth) ||
          isAfter(itemDate, firstDayOfMonth)) &&
        (isEqual(itemDate, lastDayOfMonth) ||
          isBefore(itemDate, lastDayOfMonth))
      );
    });

    const currentMonthExpenses = expenses?.filter((item) => {
      const itemDate = new Date(item?.expense_date);

      return (
        (isEqual(itemDate, firstDayOfMonth) ||
          isAfter(itemDate, firstDayOfMonth)) &&
        (isEqual(itemDate, lastDayOfMonth) ||
          isBefore(itemDate, lastDayOfMonth))
      );
    });

    const expensesSum =
      currentMonthExpenses?.reduce((acc, el) => {
        acc += el.amount;
        return acc;
      }, 0) || 0;

    const sellingsSum =
      currentMonthOrders
        ?.filter((o) => o.status === "DELIVERED")
        ?.reduce((acc, el) => {
          const selling_price = delve(el, "selling_price");
          acc += selling_price;
          return acc;
        }, 0) || 0;

    const netCostSum =
      currentMonthOrders?.reduce((acc, el) => {
        const net_cost = delve(el, "net_cost");
        acc += net_cost;
        return acc;
      }, 0) || 0;

    monthsData.costPrices.unshift(netCostSum);
    monthsData.expenses.unshift(expensesSum);
    monthsData.profits.unshift(sellingsSum);
    monthsData.netIncomes.unshift(sellingsSum - netCostSum - expensesSum);
    monthsData.months.unshift(monthName);

    if (currentMonth === 0) {
      currentYear--; // Decrement the year if the current month is January
      currentMonth = 11; // Set the current month to December
    } else {
      currentMonth--; // Move to the previous month
    }
  }

  return monthsData;
}

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
      return { id: { $ne: null } };
  }
};

const formatOrdersFilters = ({ status }) => {
  return {
    status: status || "ORDERED",
  };
};

module.exports = {
  formatOrdersFilters,
  getCurrentYearAndPast11Months,
  formatSearchCustomersFilters,
};
