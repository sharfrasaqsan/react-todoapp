import React from "react";

const SearchItem = ({ searchItem, setSearchItem }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="searchForm">
      <input
        type="text"
        name="search-item"
        id="search-item"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        placeholder="Search"
      />
    </form>
  );
};

export default SearchItem;
