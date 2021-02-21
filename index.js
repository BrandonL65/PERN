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
  } catch (error) {
    console.log(error);
  }
});

//get all todos

//get a todo

//update a todo

//delete a todo

app.listen(5000, () => {
  console.log("server started");
});
