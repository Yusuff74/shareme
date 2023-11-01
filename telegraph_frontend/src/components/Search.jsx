import React, { useState, useEffect } from "react";
import MasonryLayout from "./MasonryLayout";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";

const Search = ({ searchItems }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      if (searchItems) {
        setLoading(true);
        const query = searchQuery(searchItems.toLowerCase());
        const result = await client.fetch(query);
        setPins(result);
      } else {
        const data = await client.fetch(feedQuery);
        setPins(data);
        setLoading(false);
      }
    };

    getPost();
  }, [searchItems]);

  return (
    <div>
      {loading && <Spinner message="Searching for posts..." />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 &&
        searchItems !== "" &&
        !loading(
          <div className="mt-10 text-center text-xl">No Post Found....</div>
        )}
    </div>
  );
};

export default Search;
