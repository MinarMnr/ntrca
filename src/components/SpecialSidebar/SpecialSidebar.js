import React from "react";
import { Link } from "react-router-dom";

const SpecialSidebar = ({ menus, location }) => {
  return (
    <ul className="list-group">
      {menus.map((menu, menuIndex) => {
        return (
          <li
            className={`list-group-item cursor  ${
              location.pathname === menu.link ? "active text-white fw-bold" : ""
            }`}
            key={menuIndex}
          >
            <Link
              to={menu.link}
              // style={{ pointerEvents: menu.id == 1 ? "" : "none" }}
            >
              <span className="d-block w-100 btn btn-primary btn-outline-white fw-bold">
                {menu.title}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SpecialSidebar;
