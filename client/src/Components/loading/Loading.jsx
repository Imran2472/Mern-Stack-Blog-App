import React from "react";
import { Spinner } from "@material-tailwind/react";
function Loading() {
  return (
    <div className="h-[100vh] w-[100%] flex flex-col justify-center items-center">
      <Spinner color="blue" className="h-12 w-12" />
    </div>
  );
}

export default Loading;
