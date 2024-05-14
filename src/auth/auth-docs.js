module.exports = {
  post: {
    tags: ["Auth"],
    summary: "Gera um token de autenticação",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string", required: true },
              password: { type: "string", required: true },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Ok",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                accessToken: { type: "string" },
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
                message: { type: "string", example: "Wrong credentials" },
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
};
