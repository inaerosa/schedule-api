const router = require("express").Router();
const verifyJwt = require("../middlewares/verify-jwt");
const professionalsController = require("./professionals-controller");
const professionalsValidator = require("./professionals-validator");

router.post(
  "/",
  professionalsValidator.saveProfessional,
  professionalsController.create
);
router.get(
  "/",
  professionalsValidator.listProfessionals,
  professionalsController.list
);

router.use(verifyJwt);
router.patch("/", professionalsController.update);
router.delete("/", professionalsController.delete);

module.exports = router;
