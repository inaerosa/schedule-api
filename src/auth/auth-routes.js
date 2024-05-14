const authController = require("./auth-controller");
const authValidator = require("./auth-validator");

const router = require("express").Router();

router.post("/", authValidator, authController);

module.exports = router;
