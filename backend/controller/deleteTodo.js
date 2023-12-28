const Todo = require("../models/Todo");

exports.deleteTodo = async (req, res) => {
  try {
    const response = await Todo.findByIdAndDelete({ _id: req.params.id });

    if (!response) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error Deleting",
    });
  }
};
