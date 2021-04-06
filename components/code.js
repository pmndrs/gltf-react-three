import theme from "prism-react-renderer/themes/nightOwl";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useAsset } from "use-asset";
import { OrbitControls } from "@react-three/drei";
import Highlight, { defaultProps } from "prism-react-renderer";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Nav from "./nav";
import parse from "../lib/src/gltfjsx";

function Model({ buffer, ...props }) {
  console.log(buffer);
  const { scene } = useAsset(
    (buffer) =>
      new Promise((res, rej) => new GLTFLoader().parse(buffer, "", res, rej)),
    [buffer]
  );
  console.log(scene);

  // // useGraph builds a collection for all nodes/materials contained in the target
  // const { nodes, materials } = useGraph(scene)
  return <primitive object={scene} {...props} />;
}

const Code = (props) => {
  return (
    <div className="h-screen w-screen bg-night-dark">
      <Nav {...props} />
      <Canvas pixelRatio={[1, 2]} camera={{ position: [-2, 2, 4], fov: 25 }}>
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Model
            position-y={-0.5}
            scale={[0.2, 0.2, 0.2]}
            buffer={props.originalFile}
          />
        </Suspense>
        <OrbitControls autoRotate />
      </Canvas>

      <Highlight
        {...defaultProps}
        theme={theme}
        code={props.code}
        language="jsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} `}
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
    </div>
  );
};

export default Code;
