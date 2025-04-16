import React from "react";
import { Carousel } from "antd";
import "./img_transition.scss";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "500px",
  color: "#fff",
  textAlign: "center",
  background: "#364d79",
};

interface Props {
  images: string[];
}

const App: React.FC<Props> = ({ images }) => {
  return (
    <Carousel arrows infinite={false} style={{ width: "1000px" }}>
      {images.map((url, index) => (
        <div key={index}>
          <img
            src={url}
            alt={`house-${index}`}
            style={{ ...contentStyle, objectFit: "cover", width: "100%" }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default App;
