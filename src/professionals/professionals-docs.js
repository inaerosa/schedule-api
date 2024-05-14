module.exports = {
  "/professionals": {
    get: {
      tags: ["Professionals"],
      summary: "Lista todos profissionais e suas disponibilidades",
      parameters: [
        {
          name: "dtStart",
          in: "query",
          type: "string",
          required: false,
        },
        {
          name: "dtEnd",
          in: "query",
          type: "string",
          required: false,
        },
      ],
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    format: "uuid",
                    description: "ID do profissional",
                  },
                  name: {
                    type: "string",
                    description: "Nome do profissional",
                  },
                  email: {
                    type: "string",
                    description: "E-mail do profissional",
                  },
                  availabilites: {
                    type: "object",
                    properties: {
                      dtStart: {
                        type: "Datetime",
                        description: "Data e hora do começo da disponibilidade",
                      },
                      dtEnd: {
                        type: "Datetime",
                        description: "Data e hora do fim da disponibilidade",
                      },
                      slots: {
                        type: "array",
                        items: {
                          type: "string",
                          example: "8:00",
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
    },
    post: {
      tags: ["Professionals"],
      summary: "Cadastra um novo profissional",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", required: true },
                email: { type: "string", required: true },
                password: { type: "string", required: true },
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
                  id: { type: "string", format: "uuid" },
                  name: { type: "string" },
                  email: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    patch: {
      tags: ["Professionals"],
      summary: "Atualiza dados de um profissional",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", required: true },
              },
            },
          },
        },
      },
      responses: {
        204: {
          description: "No content",
        },
      },
      security: [{ accessToken: [] }],
    },
    delete: {
      tags: ["Professionals"],
      summary: "Deleta um profissional",
      security: [{ accessToken: [] }],
      responses: {
        204: {
          description: "No content",
        },
        404: {
          description: "Professional not found",
        },
      },
    },
  },
};
