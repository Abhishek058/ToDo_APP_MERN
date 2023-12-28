const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create({
      task: req.body.task,
    });

    res.status(200).json({
      data: newTodo,
      message: "Todo created successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
