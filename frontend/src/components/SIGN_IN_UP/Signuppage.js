import React, { useState } from "react";
// import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [CPassword, setCPassword] = useState("");
  const HandleonClick = () => { 
    if (      Password !== CPassword) 
    {     
      alert("Password Doest Match");
    } 
    else {
      axios.post("http://localhost:5000/signup", {
          username: username,
          email: email,
          password: Password,
        })
        .then((res) => {
          console.log(res.data);
          navigate("/otpScreen")
        })
        .catch((error) => 
        {
          console.error(error);
        });
    }
  };
  return (
    <>
      <div className="sm:flex mx-0  md:mx-12 lg:mx-24 my-24  md:my-12 lg:my-16 rounded-lg">
        <div className="flex-1 bg-black p-4 container ">
          <div className="mx-auto w-full md:w-96 my-6 sm:my-12">
            <input
              id="username"
              type="text"
              placeholder="User Name"
              className=" rounded-full mb-3 sm:mb-7 h-12 px-6 py-4 border-2 text-orange-500 border-orange-500 bg-black w-full"
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="example@gmail.com"
              className=" rounded-full mb-3 sm:mb-7 h-12 px-6 py-4 border-2 text-orange-500 border-orange-500 bg-black w-full"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></input>
            <input
              type="password"
              placeholder="Password"
              className=" rounded-full mb-3 sm:mb-7 h-12 px-6 py-4 border-2 text-orange-500 border-orange-500 bg-black w-full"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></input>
            <input
              type="password"
              placeholder="Confirm Password"
              className=" rounded-full mb-3 sm:mb-7 h-12 px-6 py-4 border-2 text-orange-500 border-orange-500 bg-black w-full"
              onChange={(event) => {
                setCPassword(event.target.value);
              }}
            ></input>
            {/* <Link to="/"> */}
            Go to SignUp
            <button
              onClick={HandleonClick}
              className=" rounded-full h-12 px-6 mt-5 sm:mt-10 border-2 text-white border-none bg-orange-500 w-full"
            >
              Submit
            </button>
            {/* </Link> */}
          </div>
        </div>
        <div className="flex-1 bg-orange-500 p-4 container py-16">
          <img
            src="/Quill.png"
            alt="Logo"
            className=" w-64 mx-auto my-6 sm:my-12 md:my-24"
          ></img>
          <p className=" font-sans text-white font-bold mx-2 sm:mx-4 md:mx-10 my-6 sm:my-12 ">
            Empowering Your Daily Voice: Seamlessly Manage and Share Your Unique
            Stories Every Day on Our Blogging Platform.
          </p>
        </div>
      </div>
    </>
  );
}
