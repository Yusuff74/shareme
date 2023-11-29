import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import RegisterForm from "./utils/RegisterForm";
const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<RegisterForm />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
