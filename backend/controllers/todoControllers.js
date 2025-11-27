const { Todo, Category } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  //getAll
  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const per_page = parseInt(req.query.per_page) || 10;
      const offset = (page - 1) * per_page;

      const search = req.query.search || "";

      const todos = await Todo.findAndCountAll({
        where: {
          title: { [Op.iLike]: `%${search}%` },
        },
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name", "color"],
          },
        ],
        limit: per_page,
        offset,
        order: [["createdAt", "DESC"]],
      });

      // Format response mirip contoh
      res.json({
        data: todos.rows.map((todo) => ({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          completed: todo.completed,
          category: todo.category,
          priority: todo.priority, 
          due_date: todo.due_date,
          created_at: todo.createdAt,
          updated_at: todo.updatedAt,
        })),
        pagination: {
          current_page: page,
          per_page,
          total: todos.count,
          total_pages: Math.ceil(todos.count / per_page),
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch todos" });
    }
  },

  //getOne
  async getOne(req, res) {
    try {
      const todo = await Todo.findByPk(req.params.id);

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: "Failed to get Todo" });
    }
  },

  //create
  async create(req, res) {
    try {
      const todo = await Todo.create(req.body);
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: "Create failed" });
    }
  },

  //update
  async update(req, res) {
    try {
      const [updated] = await Todo.update(req.body, {
        where: { id: req.params.id },
      });

      if (!updated) {
        return res.status(404).json({ message: "Todo not found" });
      }

      const updatedTodo = await Todo.findByPk(req.params.id);
      res.json(updatedTodo);
    } catch (error) {
      res.status(500).json({ error: "Update failed" });
    }
  },

  //remove
  async delete(req, res) {
    try {
      await Todo.destroy({ where: { id: req.params.id } });
      res.json({ message: "Deleted" });
    } catch (error) {
      res.status(500).json({ error: "Delete failed" });
    }
  },

  //patch for completion
  async toggleCompletion(req, res) {
    try {
      const todo = await Todo.findByPk(req.params.id);

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      todo.completed = !todo.completed;
      await todo.save();
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: "Failed toggled completion" });
    }
  },
};
