import React, { useEffect, useState } from "react";
import SlideComponents from "../components/SlideComponents";
import slide7 from "../public/img/slide7.jpeg";
import slide8 from "../public/img/slide8.jpeg";
import slide9 from "../public/img/slide9.jpeg";
import Col from "react-bootstrap/Col";
import NavbarComponents from "./NavbarComponents";

const SlideAnNavComponent = (props) => {
  return (
    <div className="slide">
      <SlideComponents arrImages={[slide7, slide8, slide9]} />
      <Col xxl={12} xl={12} className="_navbar">
        <div>
          {!props?.loadingType && <NavbarComponents arrType={props?.arrType} />}
        </div>
      </Col>
    </div>
  );
};

export default SlideAnNavComponent;
