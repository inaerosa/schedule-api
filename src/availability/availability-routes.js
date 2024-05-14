const availabilityController = require("./availability-controller");
const availabilityValidator = require("./availability-validator");

const router = require("express").Router();

const verifyJWT = require("../middlewares/verify-jwt");

router.use(verifyJWT);

router.post(
  "/",
  availabilityValidator.checkAvailability,
  availabilityController.create
);

router.get("/", availabilityController.list);

router.put(
  "/:id",
  availabilityValidator.checkId,
  availabilityValidator.checkAvailability,
  availabilityController.update
);

router.delete(
  "/:id",
  availabilityValidator.checkId,
  availabilityController.delete
);

module.exports = router;
