import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Feed, CreatePin, Navbar, PinDetails, Search } from "../components";

const Pins = ({ user }) => {
  const [searchItems, setSearchItems] = useState("");
  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar
          searchItems={searchItems}
          setSearchItems={setSearchItems}
          user={user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetails user={user} />}
          />
          <Route path="/create-pin" element={<CreatePin user={user} />} />
          <Route
            path="/search"
            element={
              <Search
                searchItems={searchItems}
                setSearchItems={setSearchItems}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
