module.exports = function (period) {
  const currentDate = new Date();
  const endPeriodDate = new Date(currentDate.getTime());
  endPeriodDate.setUTCMonth(endPeriodDate.getMonth() - period + 1);
  endPeriodDate.setUTCDate(0);
  endPeriodDate.setUTCHours(23, 59, 59, 999);

  return endPeriodDate;
};
