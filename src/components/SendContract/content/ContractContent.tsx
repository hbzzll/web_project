// components/ContractContent.tsx
import React from "react";

interface Props {
  transaction: {
    tenantName: string;
    tenantEmail: string;
    landlordName: string;
    landlordEmail: string;
    updatedAt: string;
  };
  house: {
    city: string;
    detailedAddress: string;
    price: number;
    propertyType: string;
    size: number;
  };
}

const ContractContent: React.FC<Props> = ({ transaction, house }) => {
  const everyday = (house.price / 30).toFixed(2);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontWeight: "bold", fontSize: 28 }}>GO RENT</div>
        <div style={{ textAlign: "right" }}>
          <p>
            <strong>Landlord:</strong> {transaction.landlordName}
          </p>
          <p>{transaction.landlordEmail}</p>
        </div>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <p>
        <strong>Tenant:</strong> {transaction.tenantName} (
        {transaction.tenantEmail})
      </p>

      <h3 style={{ marginTop: 30, fontSize: 28 }}>Rental Property Details</h3>
      <p>
        <strong>Address:</strong> {house.detailedAddress}, {house.city}
      </p>
      <p>
        <strong>Property Type:</strong> {house.propertyType}
      </p>
      <p>
        <strong>Monthly Rent:</strong> {house.price} kr
      </p>
      <p>
        <strong>Size:</strong>
        {house.size} m²
      </p>

      <h3 style={{ marginTop: 30, fontSize: 28 }}>Bank Transfer Details</h3>
    </div>
  );
};

export default ContractContent;
