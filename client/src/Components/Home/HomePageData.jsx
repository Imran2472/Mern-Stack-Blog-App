import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../State/AppContext";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";

function HomePageData() {
  const { home } = useContext(AppContext);
  // const [lastObject, setLastObject] = useState([]);
  // setLastObject(home?.home[home?.home?.length - 1]);

  // home?.home.map((item, index) => {
  //   if (index == item.length - 1) {
  //     setLastObject(item);
  //     return item;
  //   }
  // });
  // console.log(
  //   home?.home.map((item, index) => {
  //     console.log(item);
  //     return item;
  //   })
  // );

  // console.log(lastObject);

  return (
    <>
      {home ? (
        <>
          {home?.home.map((item, index) => {
            // console.log(item, index);
            if (index == home?.home.length - 1) {
              return (
                <div className="px-[100px] py-[3rem]" key={index}>
                  <div className="grid grid-cols-2 gap-5 border-red-700 items-center">
                    <div className="cols-one">
                      <h1 className="text-[2.6rem] leading-[50px] text-slate-800 font-semibold cursor-pointer">
                        {item?.homeText}
                      </h1>
                      <p className="my-4 text-sm text-slate-500 ">
                        {item?.subText}
                      </p>
                      <div className="">
                        <Link
                          to={`${item?.link}`}
                          className="text-white bg-blue-500 hover:bg-blue-700 rounded-md px-4 py-2"
                        >
                          {item?.buttonText}
                        </Link>
                      </div>
                    </div>
                    <div className="cols-one">
                      <img
                        src={item?.image}
                        alt=""
                        className="w-[100%] h-[100%] object-contain"
                      />
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}

export default HomePageData;
