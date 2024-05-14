const dayjs = require("dayjs");

module.exports = {
  execute: ({ dtStart, dtEnd }) => {
    let currentDate = dayjs(dtStart);
    const dateEnd = dayjs(dtEnd);

    const slots = [currentDate.format("HH:mm")];

    do {
      currentDate = currentDate.add(30, "minutes");
      slots.push(currentDate.format("HH:mm"));
    } while (currentDate.isBefore(dateEnd));

    return slots;
  },
};
