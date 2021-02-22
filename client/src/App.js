import "./App.css";
import { Fragment } from "react";
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

function App() {
  return (
    <>
      <h1 className="text-center mt-5">Keeping Track</h1>
      <InputTodo />
      <ListTodo />
    </>
  );
}

export default App;
