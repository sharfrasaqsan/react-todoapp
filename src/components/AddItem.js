import React from "react";

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add your task"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        required
        autoFocus
        autoComplete="off"
        id="add-item"
        name="add-item"
        className="add-item"
      />
      <button>Add</button>
    </form>
  );
};

export default AddItem;
