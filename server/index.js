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
  console.log("Getting all Todos...");
  try {
    let allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
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
app.put("/todos/:id", async (req, res, next) => {
  console.log(req.body, req.params.id);
  try {
    const idOfTodo = req.params.id;
    const newDescription = req.body.description;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 where todo_id = $2",
      [newDescription, idOfTodo]
    );

    res.json(`Todo # ${idOfTodo} was updated!`);
  } catch (error) {
    console.log(error.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res, next) => {
  try {
    const idOfTodo = req.params.id;
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [idOfTodo]);

    res.json(`Todo with ID of ${idOfTodo} was deleted.`);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(5000, () => {
  console.log("server started");
});
