import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";

const NavbarComponents = (arrType) => {
  const navigate = useNavigate();
  const handleNavigateType = (type) => {
    navigate(
      `/product/${type
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "_")}`,
      { state: type }
    );
  };
  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <div className="navlink-list">
        {arrType?.arrType?.map((type, index) => {
          return (
            <span key={index}>
              {type !== "Khác" && (
                <Nav.Link onClick={() => handleNavigateType(type)}>
                  {type}
                </Nav.Link>
              )}
            </span>
          );
        })}
        <Nav.Link onClick={() => handleNavigateType("Khác")}>{"Khác"}</Nav.Link>
      </div>
    </Nav>
  );
};

export default NavbarComponents;
