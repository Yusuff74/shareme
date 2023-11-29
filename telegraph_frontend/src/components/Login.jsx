import React, { useEffect, useState } from "react";
import { client } from "../client";
import Input from "../utils/Input";
import logo from "../assets/logo.png";
import shareVideo from "../assets/share.mp4";
import { usersQuery } from "../utils/data";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ name: "", password: "" });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const query = usersQuery();
        const data = await client.fetch(query);
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const onChange = (value, name) => {
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const login = (e) => {
    e.preventDefault();

    const currentUser = users.find(
      (currentUser) => user.name === currentUser.email
    );

    if (!currentUser || currentUser.password !== user.password) {
      setError(true);
      return;
    } else {
      navigate("/");
    }
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
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
          <div className="shadow-2xl">
            <form onSubmit={login}>
              <div className="grid md:grid-cols-2 md:gap-6 mt-4">
                <Input
                  value={user.email}
                  name="name"
                  onChange={onChange}
                  label="Email"
                  type="email"
                />
                <Input
                  value={user.userName}
                  onChange={onChange}
                  label="Password"
                  name="password"
                  type="text"
                />
                {error && (
                  <>
                    <p className="text-sm text-white dark:text-gray-400">
                      incorrect username or password
                    </p>
                    <p className="text-sm text-white dark:text-gray-400">
                      or register <Link to="/register">here</Link>
                    </p>
                  </>
                )}
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
