const { availability } = require("../lib/prisma");

module.exports = {
  "/availabilities": {
    get: {
      tags: ["Availability"],
      summary: "Lista disponibilidades",
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  availability: {
                    type: "object",
                    properties: {
                      id: { type: "string", format: "uuid" },
                      professionalId: { type: "string", format: "uuid" },
                      dtStart: { type: "string", format: "date-time" },
                      dtEnd: { type: "string", format: "date-time" },
                      slots: {
                        type: "array",
                        items: { type: "string", example: "8:00" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Availability"],
      summary: "Cadastra uma disponibilidade",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                dateStart: {
                  type: "object",
                  properties: {
                    year: { type: "integer" },
                    month: { type: "integer" },
                    day: { type: "integer" },
                    hour: { type: "integer" },
                    minutes: { type: "integer" },
                  },
                  required: ["year", "month", "day", "hour", "minutes"],
                },
                dateEnd: {
                  type: "object",
                  properties: {
                    year: { type: "integer" },
                    month: { type: "integer" },
                    day: { type: "integer" },
                    hour: { type: "integer" },
                    minutes: { type: "integer" },
                  },
                  required: ["year", "month", "day", "hour", "minutes"],
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Created",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  availability: {
                    type: "object",
                    properties: {
                      id: { type: "string", format: "uuid" },
                      professionalId: { type: "string", format: "uuid" },
                      dtStart: { type: "string", format: "date-time" },
                      dtEnd: { type: "string", format: "date-time" },
                      slots: {
                        type: "array",
                        items: { type: "string", example: "8:00" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    put: {
      tags: ["Availability"],
      summary: "Atualiza disponibilidades",
      parameters: [
        {
          name: "id",
          in: "params",
          type: "string",
          required: false,
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                dateStart: {
                  type: "object",
                  properties: {
                    year: { type: "integer" },
                    month: { type: "integer" },
                    day: { type: "integer" },
                    hour: { type: "integer" },
                    minutes: { type: "integer" },
                  },
                  required: ["year", "month", "day", "hour", "minutes"],
                },
                dateEnd: {
                  type: "object",
                  properties: {
                    year: { type: "integer" },
                    month: { type: "integer" },
                    day: { type: "integer" },
                    hour: { type: "integer" },
                    minutes: { type: "integer" },
                  },
                  required: ["year", "month", "day", "hour", "minutes"],
                },
              },
            },
          },
        },
      },

      responses: {
        200: {
          description: "Ok",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
    delete: {
      tags: ["Availability"],
      summary: "Deleta uma disponibilidade",
      parameters: [
        {
          name: "id",
          in: "params",
          type: "string",
          required: false,
        },
      ],

      responses: {
        200: {
          description: "Ok",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
};
