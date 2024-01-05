import React, { useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const navigate = useNavigate();
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const HandleonClick = () => {
    axios
      .post("http://localhost:5000/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        // const { message} = res.data;
        if (res.status === 200) {
          console.log("Data Submitted");
          navigate("/Home");
        } 
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("Invalid credentials");
        } else {
          alert("An error occurred. Please try again.");
        }
        console.error(error);
      });
  };

  return (
    <>
      <div className="sm:flex  mx-0  md:mx-12 lg:mx-24 my-24  md:my-12 lg:my-24 rounded-lg ">
        <div className="flex-1  bg-orange-500 p-4 container py-16  ">
          <img
            src="/Quill.png"
            alt="Logo"
            className="w-64 mx-auto my-6 sm:my-12 md:my-24"
          />
          <p className="font-serif text-white  mx-2 sm:mx-4 md:mx-10 my-6 sm:my-12">
            Empowering Your Daily Voice: Seamlessly Manage and Share Your Unique
            Stories Every Day on Our Blogging Platform.
          </p>
        </div>
        <div className="flex-1 bg-black p-12 container">
          <div className="mx-auto w-full md:w-96 my-6 sm:my-12">
            <input
              onChange={(event) => {
                SetUsername(event.target.value);
              }}
              type="text"
              placeholder="User Name"
              className="rounded-full mb-3 sm:mb-7 h-12 px-6 py-4 border-2 text-orange-500 border-orange-500 bg-black w-full"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="rounded-full h-12 px-6 py-4 border-2 text-orange-500 border-orange-500 bg-black w-full"
                value={password}
                onChange={(event) => {
                  SetPassword(event.target.value);
                }}
              />
              <div
                className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  {showPassword ? (
                    <span className="text-white bg-black border-black">👁️</span>
                  ) : (
                    <span className="text-white bg-black border-black">🔒</span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={HandleonClick}
              className="rounded-full h-12 px-6 mt-5 sm:mt-10 border-2 text-white border-none bg-orange-500 hover:bg-gradient-to-r from-orange-500 to-orange-400 w-full"
            >
              Submit
            </button>

            <hr className="m-auto mt-5 border-orange-500 w-full" />

            <p className="text-white m-auto w-full md:w-64 mt-4">
              Don't have an account?{" "}
              <span className="text-orange-500">
                <Link to="/signup">
                  <button>Sign Up</button>
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
