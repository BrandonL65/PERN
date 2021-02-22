import React, { useState } from "react";

const EditTodo = (props) => {
  let [newDescription, setNewDescription] = useState(`${props.description}`);

  const updateDescription = async (e) => {
    e.preventDefault();
    console.log(newDescription);
    try {
      let response = await fetch(
        `http://localhost:5000/todos/${props.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: newDescription,
          }),
        }
      );
      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#ID${props.todo_id}`}
      >
        Edit
      </button>
      <div
        className="modal fade"
        id={`ID${props.todo_id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Todo: {props.description}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                value={newDescription}
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }}
              ></input>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  updateDescription(e);
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditTodo;
