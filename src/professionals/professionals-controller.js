const exception = require("../errors/exception");
const professionalsCreateHashPassword = require("./professionals-create-hash-password");
const professionalsRepository = require("./professionals-repository");

module.exports = {
  create: async (req, res, next) => {
    try {
      const data = req.body;

      const hashedPassord = await professionalsCreateHashPassword(
        data.password
      );

      data["password"] = hashedPassord;
      const professional = await professionalsRepository.create({ data });

      res.status(201).json(professional);
    } catch (err) {
      next(err);
    }
  },

  list: async (req, res, next) => {
    try {
      const { dtStart, dtEnd } = req.query;

      const list = await professionalsRepository.list({ dtStart, dtEnd });

      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const professional = await professionalsRepository.getById({ id });
      res.stauts(200).json({ professional });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const data = req.body;
      const userUpdated = await professionalsRepository.update(
        { id: req.id },
        { data }
      );
      if (!userUpdated) throw exception.NOT_FOUND("Professional not found");
      res.status(204);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      await professionalsRepository.delete({ id: req.id });
      return res.status(200);
    } catch (err) {
      next(err);
    }
  },
};
