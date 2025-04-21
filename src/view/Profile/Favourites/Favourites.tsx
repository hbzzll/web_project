import React from "react";

const Favourites = () => {
  const favouriteHouses = [
    { id: 1, name: "", location: "" },
    { id: 2, name: "", location: "" },
    { id: 3, name: "", location: "" },
  ];

  return (
    <>
      <h1></h1>
      <ul>
        {favouriteHouses.map((house) => (
          <li key={house.id}>
            {house.name} - {house.location}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Favourites;
