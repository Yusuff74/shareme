export const fetchUser = () => {
  const userInfo =
    localStorage.getItem("user") !== "undefinde"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  return userInfo;
};
