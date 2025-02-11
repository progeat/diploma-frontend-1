module.exports = function (period) {
  const currentDate = new Date();
  const startPeriodDate = new Date(currentDate.getTime());
  startPeriodDate.setUTCMonth(startPeriodDate.getMonth() - period);
  startPeriodDate.setUTCDate(1);
  startPeriodDate.setUTCHours(0, 0, 0, 0);

  return startPeriodDate;
};
