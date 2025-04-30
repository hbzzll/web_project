import React from "react";
import RentCard from "@/components/RentCard/RentCard";

interface StatusCardProps {
  data: any;
  isFavorited?: boolean;
}

const statusMap: { [key: number]: { label: string; color: string } } = {
  0: { label: "Rejected", color: "red" },
  1: { label: "Pending Review", color: "gray" },
  2: { label: "Available", color: "orange" },
  3: { label: "Rented", color: "green" },
  4: { label: "Delisted", color: "black" },
};

const StatusCard: React.FC<StatusCardProps> = ({ data, isFavorited }) => {
  const { status } = data;

  return (
    <div>
      <div
        className="status-tag"
        style={{
          backgroundColor: statusMap[status].color || "#d9d9d9",
          color: "#fff",
        }}
      >
        {statusMap[status].label || "Unknown"}
      </div>

      <RentCard data={data} isFavorited={isFavorited} />
    </div>
  );
};

export default StatusCard;
