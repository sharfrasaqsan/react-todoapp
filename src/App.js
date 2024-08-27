import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import AddItem from "./components/AddItem";
import SearchItem from "./components/SearchItem";
import Content from "./components/Content";
import Footer from "./components/Footer";
import apiRequest from "./components/apiRequest";

function App() {
  const API_URL = "http://localhost:3500/items";
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      (async () => await fetchItem())();
    }, 2000);
  }, []);

  const addItem = async (i) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, name: i };
    const listItems = [...items, addNewItem];
    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addNewItem),
    };

    const fetchPost = await apiRequest(API_URL, postOptions);
    if (fetchPost) setFetchError(fetchPost);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  const handleCheck = async (id) => {
    const listItems = items.map((i) =>
      i.id === id ? { ...i, checked: !i.checked } : i
    );
    setItems(listItems);

    const myItem = listItems.filter((i) => i.id === id)[0];

    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem.checked }),
    };

    const reqURL = `${API_URL}/${id}`;

    const fetchPatch = await apiRequest(reqURL, updateOptions);
    if (fetchPatch) setFetchError(fetchPatch);
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((i) => i.id !== id);
    setItems(listItems);

    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const reqURL = `${API_URL}/${id}`;

    const fetchDelete = await apiRequest(reqURL, deleteOptions);
    if (fetchDelete) setFetchError(fetchDelete);
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

      <main>
        {fetchError && (
          <p style={{ color: "red", textAlign: "center" }}>{`${fetchError}`}</p>
        )}
        {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}

        {!fetchError && !isLoading && (
          <Content
            items={items.filter((i) =>
              i.name.toLowerCase().includes(searchItem.toLocaleLowerCase())
            )}
            setItems={setItems}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>

      <Footer
        length={items.length}
        checkedTasks={items.filter((i) => i.checked).length}
        RemainingTasks={items.filter((i) => !i.checked).length}
      />
    </div>
  );
}

export default App;
