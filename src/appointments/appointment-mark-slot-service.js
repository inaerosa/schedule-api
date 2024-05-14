module.exports = {
  execute: ({ appointmentDate, slots }) => {
    const dateStart = appointmentDate.format("HH:mm");
    const dateEnd = appointmentDate.add(30, "minutes").format("HH:mm");
    const occupied = new Set([dateStart, dateEnd]);
    const arr = slots.filter((slot) => !occupied.has(slot));
    return arr;
  },
};
