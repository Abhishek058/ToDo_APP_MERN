import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import axios from "axios";

const TABS = ["All Todos", "Active Todos", "Done Todos"];

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(TABS[0]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          "https://todo-app-gxm3.onrender.com/v1/"
        );
        setTodos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching todos", error);
        setLoading(false);
      }
    };

    const fetchActiveTodos = async () => {
      try {
        const response = await axios.get(
          "https://todo-app-gxm3.onrender.com/v1/"
        );
        const filteredTodos = response.data.filter((todo) => !todo.done);

        setTodos(filteredTodos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching todos", error);
        setLoading(false);
      }
    };

    const fetchDoneTodos = async () => {
      try {
        const response = await axios.get(
          "https://todo-app-gxm3.onrender.com/v1/"
        );
        const filteredTodos = response.data.filter((todo) => todo.done);

        setTodos(filteredTodos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching todos", error);
        setLoading(false);
      }
    };

    if (selectedTab === TABS[2]) {
      fetchDoneTodos();
    } else if (selectedTab === TABS[1]) {
      fetchActiveTodos();
    } else {
      fetchTodos();
    }
  }, [selectedTab]);

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://todo-app-gxm3.onrender.com/v1/delete/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (err) {
      alert("Error deleting todo");
    }
  };

  const markTodoAsDone = async (id) => {
    try {
      await axios.put(`https://todo-app-gxm3.onrender.com/v1/update/${id}`, {
        done: true,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, done: true } : todo
        )
      );
    } catch (err) {
      alert("Error updating todo status");
    }
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const createTodo = async () => {
    await axios.post("https://todo-app-gxm3.onrender.com/v1/add", {
      task: task,
    });
  };
  return (
    <>
      <header>
        <h1>TodoList</h1>
      </header>
      <div>
        <form className="form" onSubmit={createTodo}>
          <input
            placeholder="Enter new todo..."
            className="input"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </form>
      </div>
      <div className="todo-list">
        {TABS.map((tab, index) => (
          <button
            key={index}
            className={`button ${selectedTab === tab ? "selected" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {loading ? (
        <h2>Loading...</h2>
      ) : todos.length === 0 ? (
        <h2>No Task</h2>
      ) : (
        todos.map((todo) => (
          <li
            key={todo._id}
            className="task"
            style={{ backgroundColor: todo.done ? "green" : "" }}
          >
            <span
              id="todo-text"
              onClick={() => markTodoAsDone(todo._id)}
              style={{ textDecoration: todo.done ? "line-through" : "none" }}
            >
              {todo.task}
            </span>
            <span
              className="icon"
              onClick={() => {
                deleteTodo(todo._id);
              }}
            >
              <FaTrashAlt />
            </span>
            <span
              className="icon"
              onClick={() => {
                setTask(todo.task);
                deleteTodo(todo._id);
              }}
            >
              <FaPen />
            </span>
          </li>
        ))
      )}
    </>
  );
}

export default TodoList;
