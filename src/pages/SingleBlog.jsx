import React, { useState } from "react";

import Editing from "../components/Editing";
import Preview from "../components/Preview";

export default function SingleBlog(second) {
  const [edit, setEdit] = useState(false);
  return !edit ? (
    <Preview props={{ edit, setEdit }}></Preview>
  ) : (
    <Editing props={{ edit, setEdit }}></Editing>
  );
}
