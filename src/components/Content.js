import React from "react";
import "./styles.css";
import { FaTrash } from "react-icons/fa";

const Content = ({ items, setItems, handleCheck, handleDelete }) => {
  return (
    <main>
      <div className="list-items">
        {items.length ? (
          <ul>
            {items.map((i) => (
              <li className="item" key={i.id}>
                <div className="item-info">
                  <input
                    type="checkbox"
                    checked={i.checked}
                    onChange={() => {
                      handleCheck(i.id);
                    }}
                  />
                  <label
                    htmlFor="item-label"
                    style={
                      i.checked ? { textDecoration: "line-through" } : null
                    }
                    onDoubleClick={() => handleCheck(i.id)}
                  >
                    {i.name}
                  </label>
                </div>

                <FaTrash
                  role="button"
                  onClick={() => handleDelete(i.id)}
                  className="remove-btn"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>Your list is empty</p>
        )}
      </div>
    </main>
  );
};

export default Content;
