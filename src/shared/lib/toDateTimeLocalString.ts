Date.prototype.toDateTimeLocalString = function () {
  const date = this,
    ten = (i: number) => (i < 10 ? '0' : '') + i,
    YYYY = date.getFullYear(),
    MM = ten(date.getMonth() + 1),
    DD = ten(date.getDate()),
    HH = ten(date.getHours()),
    mm = ten(date.getMinutes()),
    ss = ten(date.getSeconds());

  return `${YYYY}-${MM}-${DD}T${HH}:${mm}:${ss}`;
};
