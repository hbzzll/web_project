import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  images: string[];
}

const Fade: React.FC<Props> = ({ images }) => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };

  return (
    <div className="slider-container">
      {images.length === 1 ? (
        <img
          src={images[0]}
          alt="only-img"
          style={{ width: "100%", height: "400px" }}
        />
      ) : (
        <Slider {...settings}>
          {images.map((url, index) => (
            <div key={index}>
              <img
                src={url}
                alt={`slide-${index}`}
                style={{ width: "100%", height: "400px" }}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Fade;
