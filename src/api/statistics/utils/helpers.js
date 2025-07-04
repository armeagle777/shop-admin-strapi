const {
  isAfter,
  isBefore,
  isEqual,
  startOfMonth,
  endOfMonth,
} = require("date-fns");
const delve = require("dlv");
const { DateTime } = require("luxon");

function getCurrentYearAndPast11Months(expenses, orders) {
  const months = [
    "Հունվ․",
    "Փետր․",
    "Մրտ․",
    "Ապր․",
    "Մայ․",
    "Հնս",
    "Հլս․",
    "Օգստ․",
    "Սեպտ․",
    "Հոկտ․",
    "Նոյ․",
    "Դեկտ․",
  ];

  // Get current date in Yerevan time
  let yerevanDate = DateTime.now().setZone("Asia/Yerevan");
  let currentYear = yerevanDate.year;
  let currentMonth = yerevanDate.month; // 1-based: January=1

  const monthsData = [];

  for (let i = 0; i < 12; i++) {
    const monthName = months[currentMonth - 1]; // adjust to 0-based array

    // Get start and end of month in Yerevan timezone
    const firstDayOfMonth = DateTime.fromObject(
      { year: currentYear, month: currentMonth, day: 1 },
      { zone: "Asia/Yerevan" }
    ).startOf("day");

    const lastDayOfMonth = firstDayOfMonth.endOf("month");

    // Filter orders and expenses based on Yerevan month
    const currentMonthOrders = orders?.filter((item) => {
      const itemDate = DateTime.fromISO(item?.order_date, {
        zone: "Asia/Yerevan",
      });
      return (
        item?.attributes?.status !== "CANCELLED" &&
        item?.attributes?.status !== "RETURNED" &&
        itemDate >= firstDayOfMonth &&
        itemDate <= lastDayOfMonth
      );
    });

    const currentMonthExpenses = expenses?.filter((item) => {
      const itemDate = DateTime.fromISO(item?.expense_date, {
        zone: "Asia/Yerevan",
      });
      return itemDate >= firstDayOfMonth && itemDate <= lastDayOfMonth;
    });

    const expensesSum =
      currentMonthExpenses?.reduce((acc, el) => acc + el.amount, 0) || 0;

    const sellingsSum =
      currentMonthOrders
        ?.filter((o) => o.status === "DELIVERED")
        ?.reduce((acc, el) => acc + delve(el, "selling_price"), 0) || 0;

    const netCostSum =
      currentMonthOrders?.reduce((acc, el) => acc + delve(el, "net_cost"), 0) ||
      0;

    monthsData.push({
      name: monthName,
      Ծախսեր: expensesSum,
      Շահույթ: sellingsSum,
      Ինքնարժեք: netCostSum,
      "Զուտ եկամուտ": sellingsSum - netCostSum - expensesSum,
    });

    // Move to previous month
    const prevMonth = firstDayOfMonth.minus({ months: 1 });
    currentYear = prevMonth.year;
    currentMonth = prevMonth.month;
  }

  return monthsData.reverse(); // Reverse the order to get past months first
}
// function getCurrentYearAndPast11Months(expenses, orders) {
//   const months = [
//     "Հունվ․",
//     "Փետր․",
//     "Մրտ․",
//     "Ապր․",
//     "Մայ․",
//     "Հնս",
//     "Հլս․",
//     "Օգստ․",
//     "Սեպտ․",
//     "Հոկտ․",
//     "Նոյ․",
//     "Դեկտ․",
//   ];

//   const currentDate = new Date();
//   const yerevanOffset = 4 * 60; // 4 hours in minutes
//   const yerevanDate = new Date(
//     currentDate.getTime() + yerevanOffset * 60 * 1000
//   );

//   let currentYear = yerevanDate.getFullYear();
//   let currentMonth = yerevanDate.getMonth();

//   const monthsData = [];

//   for (let i = 0; i < 12; i++) {
//     const monthName = months[currentMonth];
//     const firstDayOfMonth = new Date(
//       startOfMonth(new Date(currentYear, currentMonth, 1)).getTime() +
//         yerevanOffset * 60 * 1000
//     );

//     const lastDayOfMonth = new Date(
//       endOfMonth(new Date(currentYear, currentMonth, 1)).getTime() +
//         yerevanOffset * 60 * 1000
//     );

//     const currentMonthOrders = orders?.filter((item) => {
//       const itemDate = new Date(item?.order_date);

//       return (
//         item?.attributes?.status !== "CANCELLED" &&
//         item?.attributes?.status !== "RETURNED" &&
//         (isEqual(itemDate, firstDayOfMonth) ||
//           isAfter(itemDate, firstDayOfMonth)) &&
//         (isEqual(itemDate, lastDayOfMonth) ||
//           isBefore(itemDate, lastDayOfMonth))
//       );
//     });

//     const currentMonthExpenses = expenses?.filter((item) => {
//       // console.log("item::::::", item);

//       const itemDate = new Date(item?.expense_date);

//       return (
//         (isEqual(itemDate, firstDayOfMonth) ||
//           isAfter(itemDate, firstDayOfMonth)) &&
//         (isEqual(itemDate, lastDayOfMonth) ||
//           isBefore(itemDate, lastDayOfMonth))
//       );
//     });

//     const expensesSum =
//       currentMonthExpenses?.reduce((acc, el) => {
//         acc += el.amount;
//         return acc;
//       }, 0) || 0;

//     const sellingsSum =
//       currentMonthOrders
//         ?.filter((o) => o.status === "DELIVERED")
//         ?.reduce((acc, el) => {
//           const selling_price = delve(el, "selling_price");
//           acc += selling_price;
//           return acc;
//         }, 0) || 0;

//     const netCostSum =
//       currentMonthOrders?.reduce((acc, el) => {
//         const net_cost = delve(el, "net_cost");
//         acc += net_cost;
//         return acc;
//       }, 0) || 0;

//     monthsData.push({
//       name: monthName,
//       Ծախսեր: expensesSum,
//       Շահույթ: sellingsSum,
//       Ինքնարժեք: netCostSum,
//       "Զուտ եկամուտ": sellingsSum - netCostSum - expensesSum,
//     });

//     if (currentMonth === 0) {
//       currentYear--; // Decrement the year if the current month is January
//       currentMonth = 11; // Set the current month to December
//     } else {
//       currentMonth--; // Move to the previous month
//     }
//   }
//   return monthsData.reverse(); // Reverse the order to get past months first
// }

module.exports = { getCurrentYearAndPast11Months };
