const dayjs = require("dayjs");
const prisma = require("../lib/prisma");
const nodemailer = require("../lib/nodemailer");
const htmlTemplate = require("../assets/template-email");
const exception = require("../errors/exception");
const appointmentRespository = require("./appointment-respoitory");
const appointmentMarkSlotService = require("./appointment-mark-slot-service");
const appointmentUnmarkSlotService = require("./appointment-unmark-slot-service");
const availabilityRepository = require("../availability/availability-repository");

module.exports = {
  create: async (req, res, next) => {
    try {
      const {
        professionalId,
        customerName,
        customerEmail,
        day,
        month,
        year,
        hour,
        minutes,
      } = req.body;

      const appointmentDate = new Date(year, month - 1, day, hour, minutes);

      const availabilities =
        await availabilityRepository.checkDisponibilityOfProfessionalInDay({
          professionalId: professionalId,
          appointment_date: appointmentDate.toISOString(),
        });

      if (!availabilities)
        throw exception.BAD_REQUEST(
          `There is no schedule for this professional in ${new Date(
            appointmentDate
          ).toLocaleDateString()}`
        );

      const dateStart = dayjs(appointmentDate);
      const dateTime = dateStart.format("HH:mm");
      const dateEnd = dateStart.add(30, "minutes").format("HH:mm");

      if (
        !availabilities.slots.includes(dateTime) ||
        !availabilities.slots.includes(dateEnd)
      )
        throw exception.BAD_REQUEST("Occupied!");

      const appointment = await appointmentRespository.create({
        professionalId,
        availabilityId: availabilities.id,
        customerName,
        customerEmail,
        appointmentDate: appointmentDate.toISOString(),
      });

      if (!appointment)
        throw exception.BAD_REQUEST("Could not save appointment");

      const slotsUpdated = appointmentMarkSlotService.execute({
        appointmentDate: dateStart,
        slots: availabilities.slots,
      });

      await availabilityRepository.updateSlots({
        professionalId: professionalId,
        appointment_date: appointmentDate,
        slots: slotsUpdated,
      });

      if (process.env.MAILER_HOST) {
        nodemailer.sendMail({
          from: "no-reply@zenklub-test.com",
          to: customerEmail,
          subject: "Confirmação de consulta pela Zenklub",
          html: htmlTemplate({
            name: customerName,
            dateDay: appointmentDate.toLocaleDateString(),
            dateTime: appointmentDate.toLocaleTimeString(),
            id: appointment.id,
          }),
        });
      }
      res.status(201).json({ appointment });
    } catch (err) {
      next(err);
    }
  },

  list: async (req, res, next) => {
    try {
      const appointments = await prisma.appointment.findMany();
      res.status(200).json(appointments);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const appointment = await prisma.appointment.findFirst({ where: { id } });

      const availabilities =
        await availabilityRepository.checkDisponibilityOfProfessionalInDay({
          professionalId: appointment.professionalId,
          appointment_date: appointment.appointment_date,
        });

      if (!availabilities)
        throw exception.BAD_REQUEST("Appointment does not exists");

      const appointmentDate = new Date(appointment.appointment_date);
      const dateSt = dayjs(appointmentDate);

      const slotsUpdated = appointmentUnmarkSlotService.execute({
        appointmentDate: dateSt,
        slots: availabilities.slots,
      });

      await appointmentRespository.delete({ id });

      await availabilityRepository.updateSlots({
        professionalId: appointment.professionalId,
        appointment_date: appointment.appointment_date,
        slots: slotsUpdated,
      });

      res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};
