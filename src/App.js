import React, { useState } from "react";
import Header from "./components/Header";
import AddItem from "./components/AddItem";
import SearchItem from "./components/SearchItem";
import Content from "./components/Content";
import Footer from "./components/Footer";

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("my-todo-list")) || []
  );

  const [newItem, setNewItem] = useState("");
  const [searchItem, setSearchItem] = useState("");

  const addItem = (i) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, name: i };
    const listItems = [...items, addNewItem];
    setItems(listItems);
    localStorage.setItem("my-todo-list", JSON.stringify(listItems));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  const handleCheck = (id) => {
    const listItems = items.map((i) =>
      i.id === id ? { ...i, checked: !i.checked } : i
    );
    setItems(listItems);
    localStorage.setItem("my-todo-list", JSON.stringify(listItems));
  };

  const handleDelete = (id) => {
    const listItems = items.filter((i) => i.id !== id);
    setItems(listItems);
    localStorage.setItem("my-todo-list", JSON.stringify(listItems));
  };


  return (
    <div className="App">
      <Header />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem searchItem={searchItem} setSearchItem={setSearchItem} />
      <Content
        items={items.filter((i) =>
          i.name.toLowerCase().includes(searchItem.toLocaleLowerCase())
        )}
        setItems={setItems}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer
        length={items.length}
        checkedTasks={items.filter((i) => i.checked).length}
        RemainingTasks={items.filter((i) => !i.checked).length}
      />
    </div>
  );
}

export default App;
