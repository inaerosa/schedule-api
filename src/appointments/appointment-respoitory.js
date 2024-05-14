const prisma = require("../lib/prisma");

module.exports = {
  create: async ({
    professionalId,
    availabilityId,
    customerName,
    customerEmail,
    appointmentDate,
  }) => {
    const appointment = await prisma.appointment.create({
      data: {
        professional: { connect: { id: professionalId } },
        availability: { connect: { id: availabilityId } },
        customerName: customerName,
        customerEmail: customerEmail,
        appointment_date: appointmentDate,
      },
    });

    return appointment;
  },

  list: async ({ availabilityId }) => {
    const list = await prisma.appointment.findMany({
      where: {
        availabilityId: availabilityId,
      },
    });
    return list;
  },

  delete: async ({ id, professionalId }) => {
    try {
      await prisma.appointment.delete({ where: { id, professionalId } });
    } catch (err) {
      console.error(err);
    }
  },
};
