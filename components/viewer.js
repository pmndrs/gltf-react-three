import React from 'react'
import * as THREE from 'three'
import { Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export const Center = React.forwardRef(function Center({ children, ...props }, ref) {
  const camera = useThree((state) => state.camera)
  const inner = React.useRef()
  React.useLayoutEffect(() => {
    if (inner.current) {
      const box3 = new THREE.Box3().setFromObject(inner.current)
      const center = new THREE.Vector3()
      const sphere = new THREE.Sphere()
      box3.getCenter(center)
      box3.getBoundingSphere(sphere)
      inner.current.position.set(-center.x, -center.y, -center.z)
      camera.position.set(0, sphere.radius, sphere.radius * 3)
      camera.lookAt(0, 0, 0)
    }
  }, [])
  return (
    <group ref={ref} {...props}>
      <group ref={inner}>{children}</group>
    </group>
  )
})

const Viewer = ({ scene }) => {
  return (
    <Canvas pixelRatio={[1, 2]} camera={{ position: [0, 0, 150], fov: 50 }}>
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <Suspense fallback={null}>
        <Center>
          <primitive object={scene} />
        </Center>
      </Suspense>
      <OrbitControls autoRotate />
    </Canvas>
  )
}

export default Viewer
