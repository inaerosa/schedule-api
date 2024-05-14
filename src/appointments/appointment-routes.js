const router = require("express").Router();
const appointmentController = require("./appointment-controller");
const appointmentValidator = require("./appointment-validator");

router.post(
  "/",
  // appointmentValidator.saveAppointment,
  appointmentController.create
);
router.get("/", appointmentController.list);
router.delete(
  "/:id",
  appointmentValidator.deleteAppointment,
  appointmentController.delete
);

module.exports = router;
