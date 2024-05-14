const prisma = require("../lib/prisma");

module.exports = {
  create: async ({ dtStart, dtEnd, professionalId, slots }) => {
    const availability = await prisma.availability.create({
      data: {
        dtStart,
        dtEnd,
        professionalId,
        slots,
      },
    });
    return availability;
  },

  checkDisponibilityOfProfessionalInDay: async ({
    professionalId,
    appointment_date,
  }) => {
    const availability = await prisma.availability.findFirst({
      where: {
        professionalId: professionalId,
        AND: [
          { dtStart: { lte: appointment_date } },
          { dtEnd: { gt: appointment_date } },
        ],
      },
      select: {
        professionalId: true,
        slots: true,
        id: true,
      },
    });

    return availability;
  },

  list: async ({ professionalId }) => {
    const list = await prisma.availability.findMany({
      where: {
        professionalId: professionalId,
      },
    });
    return list;
  },

  updateAvailability: async ({
    professionalId,
    availabilityId,
    dtStart,
    dtEnd,
    slots,
  }) => {
    const updated = await prisma.availability.updateMany({
      where: {
        professionalId: professionalId,
        id: availabilityId,
      },
      data: {
        dtStart,
        dtEnd,
        slots,
      },
    });

    return updated;
  },

  updateSlots: async ({ professionalId, appointment_date, slots }) => {
    try {
      await prisma.availability.updateMany({
        where: {
          professionalId: professionalId,
          AND: [
            { dtStart: { lte: new Date(appointment_date) } },
            { dtEnd: { gt: new Date(appointment_date) } },
          ],
        },
        data: {
          slots,
        },
      });
    } catch (err) {
      console.error(err);
    }
  },

  delete: async ({ availabilityId }) => {
    await prisma.availability.deleteMany({
      where: {
        id: availabilityId,
      },
    });
    return;
  },
};
