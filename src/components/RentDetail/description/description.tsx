import React from "react";
import "./description.scss";

type DescriptionItem = {
  label: string;
  value: string | number;
};

interface Props {
  data: DescriptionItem[];
}

const Description: React.FC<Props> = ({ data }) => {
  return (
    <div className="description-grid">
      {data.map((item, index) => (
        <div className="description-item" key={index}>
          <div className="label">{item.label}</div>
          <div className="value">{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default Description;
