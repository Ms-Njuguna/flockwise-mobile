export const groupByWeek = (data) => {
  return data.reduce((acc, item) => {
    const week = new Date(item.date).getWeek?.() || "week";

    acc[week] = (acc[week] || 0) + item.eggs_collected || 0;
    return acc;
  }, {});
};

export const groupByMonth = (data) => {
  return data.reduce((acc, item) => {
    const month = new Date(item.date).getMonth();

    acc[month] = (acc[month] || 0) + item.eggs_collected || 0;
    return acc;
  }, {});
};