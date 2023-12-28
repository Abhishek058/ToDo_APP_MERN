const express = require("express");
const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors());

const todoRoutes = require("./routes/todoRoute");
app.use("/v1", todoRoutes);

const dbConnect = require("./config/db");
dbConnect();

app.listen(3001, () => {
  console.log("Server Running on http://localhost:3001");
});

app.get("/", (req, res) => {
  res.send(`<h1>SERVER RUNNING FINE</h1>`);
});
