const express = require("express");
const router = express.Router();

const { createTodo } = require("../controller/createTodo");
const { getTodo } = require("../controller/getTodo");
const { deleteTodo } = require("../controller/deleteTodo");
const { updateTodo } = require("../controller/updateTodo");

router.post("/add", createTodo);
router.get("/", getTodo);
router.delete("/delete/:id", deleteTodo);
router.put("/update/:id", updateTodo)

module.exports = router;
