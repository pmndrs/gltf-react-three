import React, { useEffect, useState } from "react";
import { parse } from "../lib/gltsfx";
import Nav from "./nav";
import Viewer from "./viewer";
import Code from "./code";

const Result = (props) => {
  const [data, setData] = useState();
  const [types, setTypes] = useState(false);

  useEffect(async () => {
    const parsed = await parse(props.fileName, props.originalFile, types);
    setData(parsed);
  }, [types]);

  if (!data) return <p className="text-4xl font-bold">Loading ...</p>;

  return (
    <div className="min-h-screen w-screen bg-night-dark">
      <Nav types={types} setTypes={setTypes} code={data.jsx} />
      <div className="grid grid-cols-2">
        <Code jsx={data.jsx} />
        <Viewer scene={data.scene} />
      </div>
    </div>
  );
};

export default Result;
