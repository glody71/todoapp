const { Category } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  //get
  async getAll(req, res) {
    try {
      const categories = await Category.findAll({
        order: [["createdAt", "ASC"]],
      });
      res.json(categories);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  },
  //create
  async create(req, res) {
    try {
      const category = await Category.create(req.body);
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Create failed" });
    }
  },

  //update
  async update(req, res) {
    try {
      const category = await Category.update(req.body, {
        where: { id: req.params.id },
      });
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Update failed" });
    }
  },

  //delete
  async delete(req, res) {
    try {
      await Category.destroy({ where: { id: req.params.id } });
      res.json({ message: "Deleted" });
    } catch (error) {
      res.status(500).json({ error: "Delete failed" });
    }
  },
};
