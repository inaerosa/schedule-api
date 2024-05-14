const express = require("express");
const app = express();
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-handler");

const authRoutes = require("./auth/auth-routes");

const appointmentRoutes = require("./appointments/appointment-routes");
const professionalRoutes = require("./professionals/professionals-routes");
const availabilityRoutes = require("./availability/availability-routes");

app.use(express.json());

app.use("/professionals", professionalRoutes);
app.use("/availability", availabilityRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/auth", authRoutes);

const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./docs/index");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errors());
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server running at ${3000}`);
});
