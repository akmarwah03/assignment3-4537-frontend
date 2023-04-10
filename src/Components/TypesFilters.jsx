import React, { useState } from "react";

function TypesFilter({ types, selectedTypes, setSelectedTypes }) {
  const handleCheckboxChange = (e) => {
    const type = e.target.value;
    if (e.target.checked) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    }
  };

  return (
    <div className="types-filter">
      <h2>Types</h2>
      <div className="types-list">
        {types.map((type) => (
          <div style={{ display: "block" }} key={type}>
            <label className="type">
              <input
                type="checkbox"
                value={type}
                checked={selectedTypes.includes(type)}
                onChange={handleCheckboxChange}
              />{" "}
              {type}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TypesFilter;
