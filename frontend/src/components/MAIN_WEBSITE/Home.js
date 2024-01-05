import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { LineWave } from "react-loader-spinner";
import axios from "axios";

function FrontPage() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [sblogs, setSBlogs] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  const fetchBlogsByCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/blogs/${searchCategory}`
      );
      setSBlogs(response.data);
      setShowNoResultsMessage(false);
    } catch (error) {
      console.error(`Error fetching ${searchCategory} blogs:`, error);
      setError("Error fetching blogs");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/Home");
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const result = await response.json();
        setBlogs(result.blogs);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setError("Error fetching blogs");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchCategory) {
      fetchBlogsByCategory();
      const timeout = setTimeout(() => {
        setShowNoResultsMessage(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [searchCategory]);

  const displayBlogs = searchCategory ? sblogs : blogs;
  const scrollToUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Layout>
      <div className="mx-0 md:mx-0  lg:mx-16  ">
        <div className="my-4 mx-2  flex items-center relative">
          <input
            type="text"
            placeholder="Search Username..."
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="px-3 py-2 border rounded-xl w-full my-4 border-gray-400 "
          />
        </div>
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}
        <div className="flex flex-col gap-20  ">
          {displayBlogs.length > 0 ? (
            <ul>
              {displayBlogs.map((blog) => (
                <Link
                  to={`/HomeDetail/${blog._id}`}
                  className=" shadow-2xl    py-11 px-7 transition duration-500 block"
                  key={blog._id}
                >
                  <div key={blog._id} className="  rounded-lg  overflow-hidden">
                    <div className="flex px-2 py-2">
                      <img
                        src={process.env.PUBLIC_URL + "/download.png"}
                        alt="Dp"
                        className="object-cover h-9 rounded-xl"
                      />
                      <p className="text-md  px-1 py-2    ">{blog.username}</p>
                    </div>

                    <div className="flex flex-col ">
                      <div className="flex flex-col gap-2 p-1 ">
                        <h2 className="text-xl font-sans">{blog.title}</h2>
                        {/* <p className="text-lg font-semibold">{blog.snippets}</p> */}
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
                    <div className=" w-full h-96 overflow-hidden">
                      <img
                        src={blog.im ? require(`../../imgs/${blog.im}`) : null}
                        alt={blog.im}
                        width={"100%"}
                        height={"100%"}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                        className=" w-full h-full"
                      ></img>
                    </div>
                  </div>
                </Link>
              ))}
              <div className="flex justify-end  ">
                {" "}
                <img
                  src={process.env.PUBLIC_URL + "/icon.png"}
                  alt="search"
                  onClick={scrollToUp}
                  className="object-cover h-14 rounded-xl fixed bottom-10 right-2 bg-gray-100  cursor-pointer"
                  style={{ zIndex: 999 }} // Ensure the icon stays above other elements
                />
              </div>
            </ul>
          ) : showNoResultsMessage ? (
            <div className="flex items-center h-screen justify-center">
              <p>No results found.</p>
            </div>

) : (
            <div className="flex items-center h-screen justify-center">
              <LineWave
                height={250}
                width={200}
                color="#FFA500"
                ariaLabel="line-wave"
                visible={true}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default FrontPage;
