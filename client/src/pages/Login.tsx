import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [isCorrected, setisCorrected] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChanged = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8800/api/login", inputs, {
        withCredentials: true,
      });
      const data = await res.data;
      if (data === "EMAIL_NOT_FOUND") {
        return setisCorrected("Email is not correct.");
      } else if (data === "PASSWORD_NOT_FOUND") {
        return setisCorrected("Password is not correct.");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {" "}
      <div className="w-screen h-screen bg-slate-200 flex justify-center items-center">
        <div className="bg-white p-10 flex items-center justify-center flex-col text-center shadow-xl w-[40%] rounded-lg">
          <h2 className="mb-5 text-[25px]">Log in</h2>
          <div className="flex justify-between flex-col gap-5 w-full">
            <p className="text-red-500">{isCorrected}</p>
            <input
              name="email"
              className="py-4 px-4 border-b border-gray-300 rounded-md"
              type="email"
              onChange={handleChanged}
              placeholder="Email"
              value={inputs.email}
            />
            <input
              name="password"
              className="py-4 px-4 border-b border-gray-300 rounded-md"
              type="Password"
              onChange={handleChanged}
              placeholder="Password"
              value={inputs.password}
            />
            <button
              className="bg-green-500 py-2 px-4 rounded-md text-white mt-5 hover:bg-green-600 duration-200"
              onClick={handleLogin}
            >
              Log in
            </button>
            <p>
              You do not have an account??
              <Link
                to="/signup"
                className="text-red-400 hover:text-red-500 duration-200 ml-3"
              >
                Sing up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
