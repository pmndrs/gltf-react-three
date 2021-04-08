import React, { useLayoutEffect } from 'react'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'

export default function Viewer({ scene }) {
  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = obj.receiveShadow = true
        obj.material.envMapIntensity = 0.8
      }
    })
  }, [scene])

  return (
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 150], fov: 50 }}>
      <ambientLight intensity={0.25} />
      <Suspense fallback={null}>
        <Stage contactShadow shadows adjustCamera environment="city">
          <primitive object={scene} />
        </Stage>
      </Suspense>
      <OrbitControls autoRotate />
    </Canvas>
  )
}
