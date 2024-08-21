import React from "react";
import Header from "./components/Header";
import AddItem from "./components/AddItem";
import SearchItem from "./components/SearchItem";
import Content from "./components/Content";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <AddItem />
      <SearchItem />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
