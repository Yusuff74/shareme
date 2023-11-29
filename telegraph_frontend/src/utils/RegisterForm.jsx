import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import joi from "joi";
import { client } from "../client";
import Input from "./Input";
import logo from "../assets/logo.png";
import shareVideo from "../assets/share.mp4";

const RegisterForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confrimPassword: "",
  });

  const navigate = useNavigate();

  // const validateUser = (user) => {
  //   const schema = joi.object({
  //     firstName: joi.string().min(4).max(50).required(),
  //     lastName: joi.string().min(4).max(50).required(),
  //     userName: joi.string().min(4).max(50).required(),
  //     email: joi.string().min(5).max(255).required().email(),
  //     password: joi.string().min(7).max(255).required(),
  //   });
  //   return schema.validate(user);
  // };

  const register = (e) => {
    e.preventDefault();

    // const { error } = validateUser(user);
    // if (error) return;

    if (user.password !== user.confrimPassword) return;

    const doc = {
      ...user,
      _id: Date.now().toString(),
      _type: "User",
    };

    localStorage.setItem("user", JSON.stringify(doc));

    client
      .createIfNotExists(doc)
      .then((res) => {
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err));

    navigate("/");
  };

  const onChange = (value, name) => {
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={register}>
      <div className="relative w-full h-full flex justify-start items-center flex-col h-screen">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo" />
          </div>
          <div className="shadow-2xl"></div>
          <div className="grid md:grid-cols-2 md:gap-6 mt-4">
            <Input
              value={user.email}
              name="email"
              onChange={onChange}
              label="Email"
              type="email"
            />
            <Input
              value={user.userName}
              onChange={onChange}
              label="Username"
              name="userName"
              type="text"
            />
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <Input
              value={user.firstName}
              onChange={onChange}
              label="First Name"
              name="firstName"
              type="text"
            />
            <Input
              value={user.lastName}
              onChange={onChange}
              label="Last Name"
              name="lastName"
              type="text"
            />
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <Input
              value={user.password}
              onChange={onChange}
              label="Password"
              name="password"
              type="password"
            />
            <Input
              value={user.confrimPassword}
              onChange={onChange}
              label="Confirm Password"
              name="confrimPassword"
              type="password"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
