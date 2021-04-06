import theme from "prism-react-renderer/themes/nightOwl";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import Highlight, { defaultProps } from "prism-react-renderer";

function Model({ url, ...props }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} {...props} />;
}

import Nav from "./nav";

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
            url="/bust-lo-draco.glb"
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
