import theme from "prism-react-renderer/themes/nightOwl";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Highlight, { defaultProps } from "prism-react-renderer";
import { parse } from "./gltsfx";
import Nav from "./nav";

const Code = (props) => {
  const [data, setData] = useState();

  useEffect(async () => {
    const a = await parse(props.fileName, props.originalFile, {
      types: props.types,
    });
    setData(a);
  }, [props.types]);

  return data ? (
    <div className="min-h-screen w-screen bg-night-dark">
      <Nav {...props} code={data.jsx} />
      <div className="grid grid-cols-2">
        <Highlight
          {...defaultProps}
          theme={theme}
          code={data.jsx}
          language="jsx"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} whitespace-pre-wrap `}
              style={{ ...style, padding: "5rem", paddingTop: 0 }}
            >
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
        <Canvas pixelRatio={[1, 2]} camera={{ position: [-2, 2, 4], fov: 25 }}>
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <Suspense fallback={null}>
            <primitive scale={[0.2, 0.2, 0.2]} object={data.scene} />
          </Suspense>
          <OrbitControls autoRotate />
        </Canvas>
      </div>
    </div>
  ) : (
    <p className="text-4xl font-bold">Loading ...</p>
  );
};

export default Code;
