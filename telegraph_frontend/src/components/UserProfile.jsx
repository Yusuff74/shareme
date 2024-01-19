import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";

const img =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [wrongImage, setWrongImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [activeBtn, setActiveBtn] = useState("Created");
  const navigate = useNavigate();
  const { userId } = useParams();
  const [fields, setFields] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const query = userQuery(userId);
      const data = await client.fetch(query);
      setUser(data[0]);
    };

    getData();
  }, [userId]);

  useEffect(() => {
    const getPost = async () => {
      if (text === "Created") {
        const createdPostQuery = userCreatedPinsQuery(userId);
        const data = await client.fetch(createdPostQuery);
        setPins(data);
      } else {
        const savedPostQuery = userSavedPinsQuery(userId);
        const data = await client.fetch(savedPostQuery);
        setPins(data);
      }
    };

    getPost();
  }, [text, userId]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const uploadImage = (e) => {
    console.log(e);
    const { type, name } = e.target.files[0];

    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImage(false);
      setLoading(true);

      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((data) => {
          setImage(data);
          setLoading(false);
        })
        .catch((err) => console.log("image upload error", err));
    } else {
      setWrongImage(true);
    }
  };

  const savePin = () => {
    if (image?._id) {
      const doc = {
        _type: "User",
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: image?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
      };

      client.create(doc).then(() => {
        navigate("/");
      });
    } else {
      setFields(true);
      setTimeout(() => setFields(false), 2000);
    }
  };

  if (!user) return <Spinner message="Loading Profile" />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={img}
              alt="img"
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
            />
            <img
              src={user.image}
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              alt="user-image"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            {!image ? (
              <label>
                <div className="flex flex-col items-center justify-center h-50 w-50 rounded-full">
                  <div className="flex flex-col justify-cnter items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to Upload Profile Pic</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Use high-quality JPG, SVG, PNG, GIF, less than 20MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={image?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transiton-all duration-100 ease-in-out"
                  onClick={() => setImage(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}

            <div className="flex justify-end items-end mt-5 mb-5">
              <button
                type="button"
                onClick={savePin}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Post
              </button>
            </div>

            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                <button
                  type="button"
                  className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                  onClick={logout}
                >
                  <AiOutlineLogout color="red" fontSize={21} />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("Created");
              }}
              className={`${
                activeBtn === "Created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("Saved");
              }}
              className={`${
                activeBtn === "Saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center-items-center text-bold w-full text-xl mt-2">
              No Post found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
