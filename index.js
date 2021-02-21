const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo
app.post("/todos", async (req, res, next) => {
  try {
    let message = req.body.description;
    let newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [message]
    );
    res.json(newTodo);
  } catch (err) {
    console.log(err);
  }
});

//get all todos

app.get("/todos", async (req, res, next) => {
  try {
    let allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos);
  } catch (err) {
    console.log(err);
  }
});

//get a single todo
app.get("/todos/:id", async (req, res, next) => {
  try {
    let idOfTodo = req.params.id;
    let foundTodo = await pool.query("SELECT * FROM todo where todo_id = $1", [
      idOfTodo,
    ]);
    res.json(foundTodo);
  } catch (error) {
    console.log(error.message);
  }
});

//update a todo

//delete a todo

app.listen(5000, () => {
  console.log("server started");
});
