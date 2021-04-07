import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Viewer = ({ scene }) => {
  return (
    <Canvas pixelRatio={[1, 2]} camera={{ position: [-2, 2, 4], fov: 25 }}>
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <Suspense fallback={null}>
        <primitive scale={[0.2, 0.2, 0.2]} object={scene} />
      </Suspense>
      <OrbitControls autoRotate />
    </Canvas>
  );
};

export default Viewer;
