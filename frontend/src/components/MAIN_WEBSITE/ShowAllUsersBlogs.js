import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { LineWave } from "react-loader-spinner";


function ShowAllUsersBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/AllBlogs");
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const result = await response.json();
        setBlogs(result.blogs);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="mx-0 md:mx-0 lg:mx-16">
        <div className="flex flex-col gap-12">
          {blogs.length === 0 ? (
              <div className="flex items-center h-screen justify-center">
              <LineWave
                height={250}
                width={200}
                color="#FFA500"
                ariaLabel="line-wave"
                visible={true}
              />
            </div>
          ) : (
            blogs.map((blog, index) => (
              <div key={index} className="flex relative">
                <div className="mt-12 ml-4">
                  <Link
                    to={`/UserBlogDetail/${blog._id}`}
                    className="border-t-2 border-orange-100 py-11 px-7 transition duration-500 block"
                  >
                    <div className="flex flex-col">
                      <div className="flex flex-col gap-2 p-1">
                        <h2 className="text-xl font-sans">{blog.title}</h2>
                        <p className="text-lg font-sans">
                          {blog.body ? (
                            <>
                              {blog.body.split(" ").slice(0, 33).join(" ")}
                              {blog.body.split(" ").length > 32 && (
                                <span className="text-blue-500 underline cursor-pointer">
                                  {" "}
                                  Read more
                                </span>
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-96 overflow-hidden">
                      <img
                         src={blog.im ? require(`../../imgs/${blog.im}`) : null}
                        alt={blog.im}
                        width="100%"
                        height="100%"
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                        className="w-full h-full"
                      />
                    </div>
                    
                    <button className="md:absolute top-20 right-0 mt-2 mr-24 p-2 text-white rounded-full bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                      <span className="flex items-center">Edit this blog</span>
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
       
        </div>
      </div>
    </Layout>
  );
}

export default ShowAllUsersBlogs;
