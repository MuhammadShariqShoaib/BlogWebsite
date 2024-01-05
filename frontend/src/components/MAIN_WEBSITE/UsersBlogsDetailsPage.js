
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { useNavigate } from "react-router-dom";

const UsersBlogsDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const Navigate = useNavigate();
  const [updatedData, setUpdatedData] = useState({
    title: "",
    snippets: "",
    body: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/UserBlogDetail/${id}`);
        const data = await response.json();

        if (response.ok) {
          console.log("Fetched data:", data);
          setBlog(data.blogs);
          setUpdatedData({
            title: data.blogs,
            snippets: data.blogs.snippets,
            body: data.blogs.body,
          });
        } else {
          console.error("Error fetching blog details");
        }
      } catch (error) {
        console.error("Internal server error");
      }
    };

    fetchData();
  }, [id]);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/UserBlogDetail/${id}`);
      // setBlogs(blogs.filter(blog => blog._id !== deleteId));
      Navigate("/AllBlogs");
      console.log(response.data.message);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/UserBlogDetail/${id}`, updatedData);
      Navigate(`/UpdatePage/:${id}`);
      console.log("Updated item:", response.data);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleUpdt= async () => {
    // try {
    //   const response = await axios.get(`http://localhost:5000/UpdatePage/${id}`); 
    //   Navigate(`/Update/${id}`);
    //   console.log(response.data.message);

    // } catch (error) {
    //   console.error('Error Opening item:', error);
    // }

    try {
      const response = await axios.get(`/UserBlogDetail/${id}`);
      const data = await response.json();
      Navigate(`UpdatePage/${id}`)
      
      if (response.ok) {
      }
      
      else {
        console.error("Error fetching blog details");
      }
    } catch (error) {
      console.error("Internal server error");
    }
  };

  return (
    <Layout>
      <div className="py-16 sm:w-full bg-cover" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/bg.jpg)`, height: '400px' }}>
        <div className=" shadow-lg  bg-white md:mx-60 my-16  border-1  " >
          <div className="p-8">
            {blog ? (
              <div className="flex">
                <div className="flex flex-col">
                <div className="flex justify-end ">
                  <p className="text-gray-600">Posted By: {blog.username}</p>
                  </div>
                  <h2 className="text-3xl font-serif font-bold mb-2">
                    {blog.title}
                  </h2>
                  
                  <h3 className="text-xl font-semibold mb-4">
                    {blog.snippets}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {blog.body}
                  </p>
                 
                <button onClick={handleDelete} className=" mt-2 mr-2 p-2 text-white rounded-full bg-red-500">Delete</button>

                <button onClick={handleUpdt} className=" mt-2 mr-2 p-2 text-white rounded-full bg-red-500">Update</button>

                </div>
                {/* Uncomment the button code for deletion if needed */}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <p className="text-4xl text-orange-500">Loading...</p>
                {/* Add your loader or content for loading state here */}
              </div>
            )}
          </div>
        </div>
        {/* <div className="w-16 h-16"></div> */}
        </div>

    </Layout>
  );
};

export default UsersBlogsDetailsPage;
