import React from "react";
import Slider from "react-slick";

const SlideComponents = ({ arrImages }) => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: false,
  };
  return (
    <Slider {...settings}>
      {arrImages.map((image, index) => {
        return <img key={index} src={image} alt="slide" className="item" />;
      })}
    </Slider>
  );
};

export default SlideComponents;
