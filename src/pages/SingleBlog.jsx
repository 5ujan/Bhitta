import React, { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { fetchBlog } from "../components/apiCalls";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import EditBlog from "../components/EditBlog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "../components/Context";
import { deleteBlog } from "../components/apiCalls";

const handleDeletePost = async (blogID) => {
  let hello = toast.loading("Deleting blog...", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  let resp;
  if (blogID) {
    resp = await deleteBlog({ blogID });
  }

  console.log(resp);
  if (!resp) {
    console.log("nope");
  } else {
    console.log("deleted");
    setTimeout(() => {
      console.log(123);
      console.log(location.pathname);
    }, 1000);
  }
};

const ElementMap = {
  header: (data, id) => (
    <h1 key={id} className={`text-black font-bold text-[2rem]`}>
      {data.text}
    </h1>
  ),
  paragraph: (data, id) => (
    <p key={id} className={`text-gray-800`}>
      {data.text.split("<br>").join("")}
    </p>
  ),
  image: (data, id) => {
    return (
      <div
        key={id}
        className="w-[60vw] min-w-[10rem] max-w-[45rem] flex flex-col items-center"
      >
        <img className={`text-gray w-full`} src={data.file.url}></img>
        {data.caption.length !== 0 && (
          <p className="italic text-gray-600">
            {data.caption.split("<br>").join("")}
          </p>
        )}
      </div>
    );
  },
};

const SingleBlog = () => {
  // const info = localStorage.getItem("info");
  // if(info){
  //   const {userID:self} = JSON.parse(info);
  // }
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const { blogID } = useParams();
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [blog, setBlog] = useState([]);
  const asyncWrapper = async () => {
    let temp = await fetchBlog(blogID);
    console.log(temp);
    setBlog(temp.blog);
    setLoading(false);
  };
  useEffect(() => {
    asyncWrapper();
  }, []);

  return (
    <div className="max-w-[90vw] mx-auto flex flex-col items-center">
      {loading ? (
        <div className=" h-[60vh] ">
          <img src="/loading.gif" alt="" />
        </div>
      ) : edit ? (
        <EditBlog props={blog} />
      ) : (
        <div className="min-h-[80vh] flex  w-[60%] mx-auto justify-evenly gap-4  py-4 px-24">
          <div className=" flex-1 flex flex-col gap-6">
            <div className="flex flex-col">
              <h1 className={`text-gray-900 font-bold text-[3rem]`}>
                {blog.title || "This is the title of the post"}
              </h1>
              <div className="flex items-center">
                <h1 className="bg-black text-white rounded-lg p-1 font-bold px-2 ">
                  Tags
                </h1>
                <div className="flex-1 flex justify-start">
                  {blog.tags?.map((el) => (
                    <h1
                      className="ml-2 text-black font-bold hover:underline cursor-pointer"
                      onClick={() => navigate("/filter?tags=" + el)}
                    >
                      {"#" + el}
                    </h1>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full overflow-hidden w-[2rem] bg-red-300">
                  <img src={blog.createdBy && blog.createdBy.avatar} alt="" />
                </div>
                <h1 className="text-[1.1rem] pr-5 ">
                  {blog.createdBy && blog.createdBy.name}
                </h1>
                <div className="flex items-center gap-1 cursor-pointer">
                  <FaRegHeart />
                  <span>{Math.floor(Math.random() * 90) + 10}</span>
                </div>
              </div>
            </div>
            {blog.content.map((item, index) => {
              return (
                <div key={index}>
                  {ElementMap[`${item.type}`](item.data, item.id)}
                </div>
              );
            })}
          </div>
          {user && user._id && blog.createdBy.id === user._id && (
            <div className="w-[25vw] flex flex-col gap-3 p-5 ">
              <button
                className="bg-white border-black border-[2px] border-solid min-w-[10rem] rounded-full text-black font-bold px-4 p-2"
                onClick={() => {
                  setEdit(true);
                }}
              >
                Edit Blog
              </button>
              <button
                className="bg-red-600 rounded-full text-white font-bold px-4 p-2"
                onClick={() => {
                  handleDeletePost(blogID);
                  setTimeout(() => {
                    navigate("/blog")
                    window.location.reload();
                  }, 1500);
                }}
              >
                Delete Blog
              </button>
            </div>
          )}
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
