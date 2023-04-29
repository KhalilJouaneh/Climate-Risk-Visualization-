// @ts-nocheck

import React from "react";

const ColorBar = () => {
  const colors = [
    { color: "green", description: "Low risk" },
    { color: "yellow", description: "Moderate risk" },
    { color: "orange", description: "High risk" },
    { color: "red", description: "Very high risk" },
  ];

  return (
    <div>
      <h3 className="color-heading">Risk Rating Color Code</h3>
      <div className="color-bar">
        {colors.map(({ color }) => (
          <div
            className={`color-bar__segment color-bar__segment--${color}`}
            key={color}
          ></div>
        ))}
      </div>
      <ul className="color-bar__list">
        {colors.map(({ color, description }) => (
          <li key={color}>
            <span
              className={`color-bar__bullet color-bar__bullet--${color}`}
            ></span>
            {description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorBar;
