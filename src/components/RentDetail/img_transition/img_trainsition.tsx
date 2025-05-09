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
  console.log(images);
  return (
    <div
      className="slider-container"
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "10px",
      }}
    >
      {images.length === 1 ? (
        <img
          src={images[0]}
          alt="only-img"
          style={{ width: "100%", height: "600px" }}
        />
      ) : (
        <Slider {...settings}>
          {images.map((url, index) => (
            <div key={index}>
              <img
                src={url}
                alt={`slide-${index}`}
                style={{ width: "100%", height: "600px" }}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Fade;
