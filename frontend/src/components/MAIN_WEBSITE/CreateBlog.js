// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Layout from "./Layout";
// import { TailSpin } from "react-loader-spinner";

// export default function CreateBlog() {
//   const navigate = useNavigate();
//   const [image, setImg] = useState();
//   const [allimage, setAllImg] = useState();
//   const [title, setTitle] = useState("");
//   const [snippets, setSnippets] = useState("");
//   const [body, setBody] = useState("");
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     getImg();
//   }, []);
//   const getImg = async () => {
//     const result = await axios.get("http://localhost:5000/get-image");
//     console.log(result);
//     setAllImg(result.data.data);    
//   };
//   const handleick = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("image", image);
//     const result = await axios.post(
//       "http://localhost:5000/upload-image",
//       formData,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );
//   };

//   const onInputChange = (e) => {
//     console.log(e.target.files[0]);
//     setImg(e.target.files[0]);
//   };

//   const handleClick = () => {
 
//     setLoading(true);
//     axios
//       .post("http://localhost:5000/Create", {
//         title: title,
//         snippets: snippets,
//         body: body,
//       })

//       .then((res) => {
//         // setLoading(false);
//         if (res.status === 200) {
//           navigate("/FrontPage");
//           console.log("Saved");
//         }
//       })
//       .catch((error) => {
//         // setLoading(false);
//         console.error(error);
//       });
//   };

//   return (
//     <Layout>
//       <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
//         {loading ? (
//           <div className="flex items-center justify-center">
//             <TailSpin
//               height={80}
//               width={80}
//               color="#4fa94d"
//               ariaLabel="tail-spin-loading"
//               radius={1}
//               wrapperStyle={{}}
//               wrapperClass=""
//               visible={true}
//             />
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md p-8 max-w-lg">
//             <h1 className="text-3xl font-semibold mb-6 text-center">
//               Create a Blog
//             </h1>
//            
//         <input type="file" onChange={onInputChange}></input>
//         <button
//               className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
//                  onClick={handleick}

//             >
//               Post a Blog
//             </button>
//             <button
//               className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
//               onClick={handleClick}
//             >
//               Post a Blog
//             </button>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { TailSpin } from "react-loader-spinner";

export default function CreateBlog() {
  const navigate = useNavigate();
  const [image, setImg] = useState();
  const [allimage, setAllImg] = useState();
  const [title, setTitle] = useState("");
  const [snippets, setSnippets] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getImg();
  }, []);

  const getImg = async () => {
    try {
      const result = await axios.get("http://localhost:5000/get-image");
      setAllImg(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onInputChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handlePostBlog = async () => {
    try {
      setLoading(true);

      // Upload image
      const formData = new FormData();
      formData.append("image", image);
      await axios.post("http://localhost:5000/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Create blog post
      const res = await axios.post("http://localhost:5000/Create", {
        title: title,
        snippets: snippets,
        body: body,
      });

      if (res.status === 200) {
        navigate("/FrontPage");
        console.log("Saved");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        {loading ? (
          <div className="flex items-center justify-center">
            <TailSpin
              height={80}
              width={80}
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius={1}
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-lg">
            <h1 className="text-3xl font-semibold mb-6 text-center">
              Create a Blog
            </h1>
            <input
              type="text"
              placeholder="Enter The Title Of Blog"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              className="w-full rounded h-10 px-4 mb-4 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Enter The Snippets Of Blog"
              onChange={(event) => {
                setSnippets(event.target.value);
              }}
              className="w-full rounded h-10 px-4 mb-4 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Enter the blog Content"
              onChange={(event) => {
                setBody(event.target.value);
              }}
              className="w-full rounded h-40 px-4 py-2 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <input type="file" onChange={onInputChange} />
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
              onClick={handlePostBlog}
            >
              Post a Blog
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
