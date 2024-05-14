const prisma = require("../lib/prisma");

module.exports = {
  create: async ({ data }) => {
    const professional = await prisma.professional.create({ data });
    return professional;
  },

  list: async ({ dtStart, dtEnd }) => {
    const professionals = await prisma.professional.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        availabilities: {
          select: { dtStart: true, dtEnd: true, slots: true },
          where:
            dtStart && dtEnd
              ? {
                  AND: [
                    { dtStart: { gte: new Date(dtStart) } },
                    { dtEnd: { lt: new Date(dtEnd) } },
                  ],
                }
              : undefined,
        },
      },
    });

    return professionals;
  },

  getById: async ({ id }) => {
    const professional = await prisma.professional.findFirst({
      where: { id },
      select: {
        name: true,
        availabilities: {
          dtStart: true,
          dtEnd: true,
          slots: true,
        },
      },
    });
    return professional;
  },

  getByEmail: async ({ email }) => {
    const professional = await prisma.professional.findFirst({
      where: { email },
    });

    return professional;
  },

  update: async ({ id, data }) => {
    await prisma.professional.update({ where: { id: id } }, { data });
  },

  delete: async ({ id }) => {
    await prisma.professional.delete({ where: { id: id } });
    return;
  },
};
