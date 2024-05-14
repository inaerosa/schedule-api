const appointmentDocs = require("../appointments/appointment-docs");
const authDocs = require("../auth/auth-docs");
const availabilityDocs = require("../availability/availability-docs");
const professionalDocs = require("../professionals/professionals-docs");
module.exports = {
  openapi: "3.0.3",
  info: {
    version: "1.0.0",
    title: "Zenklub Schedule API",
    description:
      "API para gerenciamento de disponibilidade de profissionais com uso de slots de tempo e marcação de consultas.",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  paths: {
    ...authDocs,
    ...appointmentDocs,
    ...availabilityDocs,
    ...professionalDocs,
  },
  components: {
    securitySchemes: {
      accessToken: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
