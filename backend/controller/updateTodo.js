const Todo = require("../models/Todo");

exports.updateTodo = async (req, res) => {
  try {
    const { task, done } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        task,
        done,
      }
    );

    res.json({
      data: todo,
      message: "Entry Updated Successfully",
    });
  } catch (err) {
    console.log(err);
  }
};
