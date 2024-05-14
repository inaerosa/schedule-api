module.exports = {
  "/appointments": {
    list: {
      tags: ["Appointments"],
      summary: "Realiza um agendamento",
    },
    post: {
      tags: ["Appointments"],
      summary: "Realiza um agendamento",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                professionalId: {
                  type: "string",
                  format: "uuid",
                  required: true,
                },
                customerName: { type: "string" },
                customerEmail: { type: "string", required: true },
                day: { type: "number", required: true },
                month: { type: "number", required: true },
                year: { type: "number", required: true },
                hour: { type: "number", required: true },
                minutes: { type: "number", required: true },
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
                  apointment: {
                    type: "object",
                    properties: {
                      id: { type: "string", format: "uuid" },
                      professionalId: {
                        type: "string",
                        format: "uuid",
                        required: true,
                      },
                      customerName: { type: "string" },
                      customerEmail: { type: "string" },
                      appointment_date: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "BAD_REQUEST",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "dt_start already exists in our database",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
    delete: {
      tags: ["Appointments"],
      summary: "Deleta um agendamento",
      parameters: [
        {
          name: "id",
          in: "params",
          type: "string",
          required: false,
        },
      ],
      responses: {
        204: {
          description: "No content",
        },

        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
};
