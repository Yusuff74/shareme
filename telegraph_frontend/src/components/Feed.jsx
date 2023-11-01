import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { feedQuery, searchQuery } from "../utils/data";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        if (categoryId) {
          const query = searchQuery(categoryId);
          const result = await client.fetch(query);
          setPins(result);
          setLoading(false);
        } else {
          const data = await client.fetch(feedQuery);
          setPins(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [categoryId]);

  if (loading)
    return <Spinner message="We are adding new ideas to your feeds!" />;

  if (!pins?.length)
    return (
      <h2 className="text-center h-full flex justify-center items-center">
        No Post Available
      </h2>
    );

  return <div className="">{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
