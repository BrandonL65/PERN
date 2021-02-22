import { useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log("form submit");
    try {
      let resp = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description,
        }),
      });
      // let jsoned = await resp.json();
      console.log(resp);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="InputTodo-Container text-center mt-5">
      <h1 className="">I am the Input Todo</h1>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button className="btn btn-warning">Add</button>
      </form>
    </div>
  );
};

export default InputTodo;
