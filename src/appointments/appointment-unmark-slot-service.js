module.exports = {
  execute: ({ appointmentDate, slots }) => {
    const dateStart = appointmentDate.format("HH:mm");
    const dateEnd = appointmentDate.clone().add(30, "minutes").format("HH:mm");

    if (!slots.includes(dateStart)) {
      slots.push(dateStart);
    }
    if (!slots.includes(dateEnd)) {
      slots.push(dateEnd);
    }

    slots.sort((a, b) => {
      const timeA = new Date("1970-01-01 " + a);
      const timeB = new Date("1970-01-01 " + b);
      return timeA - timeB;
    });

    return slots;
  },
};
