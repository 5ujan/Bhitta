import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBlogs, fetchData } from "../components/apiCalls.js";

import { useGlobalContext } from "../components/Context";

const Home = () => {
  const { user } = useGlobalContext();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    async function asyncWrapper() {
      let temp = await getAllBlogs();
      setBlogs(temp.blogs);
      console.log(temp.blogs);
    }
    asyncWrapper();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="max-w-[90vw] mx-auto">
      <div className="min-h-[80vh]">
        {user && user.name && (
          <div className="w-[90vw] mx-auto flex justify-center items-center ">
            <h1 className="text-lg">
              Have something you want to share with the world?
            </h1>
            <button
              className="mx-auto bg-black text-white font-bold p-4 min-w-[4rem] leading-4 rounded-full my-6"
              onClick={() => navigate("/blog/create")}
            >
              Add New Blog
            </button>
          </div>
        )}

        <div>
          {!blogs.length ? (
            <div className="mt-[40vh] h-[60vh] ml-[45vw] ">
              <img src="/loading.gif" alt="" />
            </div>
          ) : (
            blogs.map((el) => {
              console.log(el.content);
              let firstImg;
              if (el.content)
                firstImg = el.content.find((m) => m.type === "image");
              if (el.content && firstImg)
                firstImg = firstImg.data
                  ? firstImg.data.file
                    ? firstImg.data.file.url
                      ? firstImg.data.file.url
                      : null
                    : null
                  : null;
              else firstImg = null;
              return (
                <div
                  key={el._id}
                  className="border-b-2 border-gray-300 w-[60vw] min-w-[30rem] md:min-w-[50rem] flex flex-col gap-2 m-1 p-4 pb-6 mx-auto cursor-pointer"
                  onClick={() => {
                    navigate("/blog/" + el._id);
                  }}
                >
                  <div className="flex flex-col w-full items-start font-bold">
                    <h1 className="text-black-600 text-[2rem] ">{el.title}</h1>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-full flex flex-col gap-4 lg:gap-0 lg:flex-row overflow-hidden justify-between object-cover">
                      <p className="w-[80%]">
                        {el.content &&
                          el.content.find((el) => el.type === "paragraph") &&
                          el.content
                            .find((el) => el.type === "paragraph")
                            .data.text.split("<br>")
                            .join("")}
                      </p>
                      <img
                        src={firstImg}
                        className="w-[50%] md:w-[100%] lg:w-[20%]"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex object-cover w-full justify-between rounded-full overflow-hidden mt-3">
                    <img
                      className="w-[1.5rem] mr-2 rounded-full"
                      src={el.createdBy.avatar}
                      alt=""
                    />
                    <h1 className="font-bold flex-1 text-gray-600 italic">
                      {el.createdBy.name}
                    </h1>
                    <h1 className="text-gray-700 italic">
                      {el.createdAt.split("T")[0]}
                    </h1>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
