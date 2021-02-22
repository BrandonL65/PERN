import React, { useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [allTodos, setAllTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      let jsonData = await response.json();
      console.log(jsonData);
      setAllTodos(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const deleteTodo = async (IDToDelete) => {
    try {
      await fetch(`http://localhost:5000/todos/${IDToDelete}`, {
        method: "DELETE",
      });
      // window.location = "/";
      setAllTodos(
        allTodos.filter((todo) => {
          return todo.todo_id !== IDToDelete;
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const displayTodos = () => {
    let allTodosComponents = allTodos.map((todo) => {
      const { description, todo_id } = todo;
      return (
        <tr key={todo_id}>
          <th>{description}</th>
          <th>
            <EditTodo todo_id={todo_id} description={description} />
          </th>
          <th>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteTodo(todo_id);
              }}
            >
              Delete
            </button>
          </th>
        </tr>
      );
    });
    return allTodosComponents;
  };
  return (
    <div>
      <h1 className="text-center">List Todos</h1>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {displayTodos()}
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default ListTodo;
