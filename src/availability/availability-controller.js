const availabilityRepository = require("./availability-repository");
const appointmentsRepository = require("./../appointments/appointment-respoitory");
const availabilityGenerateSlotsService = require("./availability-generate-slots-service");
const dayjs = require("dayjs");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { dateStart, dateEnd } = req.body;

      const dtStart = new Date(
        dateStart.year,
        dateStart.month + 1,
        dateStart.day,
        dateStart.hour,
        dateStart.minutes
      );

      const dtEnd = new Date(
        dateEnd.year,
        dateEnd.month + 1,
        dateEnd.day,
        dateEnd.hour,
        dateEnd.minutes
      );

      const slots = availabilityGenerateSlotsService.execute({
        dtStart,
        dtEnd,
      });

      const availability = await availabilityRepository.create({
        dtStart,
        dtEnd,
        professionalId: req.id,
        slots,
      });

      res.status(201).json({ availability });
    } catch (err) {
      next(err);
    }
  },

  list: async (req, res, next) => {
    try {
      const list = await availabilityRepository.list({
        professionalId: req.id,
      });
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { dateStart, dateEnd } = req.body;

      const dtStart = new Date(
        dateStart.year,
        dateStart.month + 1,
        dateStart.day,
        dateStart.hour,
        dateStart.minutes
      );

      const dtEnd = new Date(
        dateEnd.year,
        dateEnd.month + 1,
        dateEnd.day,
        dateEnd.hour,
        dateEnd.minutes
      );

      const slots = availabilityGenerateSlotsService.execute({
        dtStart,
        dtEnd,
      });

      await availabilityRepository.updateAvailability({
        professionalId: req.id,
        availabilityId: id,
        dtStart,
        dtEnd,
        slots,
      });

      const appointments = await appointmentsRepository.list({
        availabilityId: id,
      });

      const appointmentsToDelete = appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.appointment_date);
        return appointmentDate < dtStart || appointmentDate > dtEnd;
      });

      for (const appointment of appointmentsToDelete) {
        await appointmentsRepository.delete({ id: appointment.id });
      }

      return res.status(200).json({ message: "atualizado" });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await availabilityRepository.delete({ id });
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },
};
