export const sandboxCode = ({ fileName, textOriginalFile, code, types }) => ({
  files: {
    'public/index.html': {
      content: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="theme-color" content="#000000">
          <!--
              manifest.json provides metadata used when your web app is added to the
              homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
            -->
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
          <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">

          <title>React App</title>
        </head>
        
        <body>
          <noscript>
            You need to enable JavaScript to run this app.
          </noscript>
          <div id="root"></div>
        </body>
        </html>`,
    },
    'src/index.js': {
      content: `
import React from 'react'
import ReactDOM from "react-dom";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <App />,
  rootElement
);
`,
    },
    'src/App.js': {
      content: `
import React from 'react'
import './style.css'
import * as THREE from 'three'
import { Suspense, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import Model from './Model'

export const Stage = React.forwardRef(function Stage(props, ref) {
  const camera = useThree((state) => state.camera)
  const outer = React.useRef()
  const inner = React.useRef()
  const [radius, setRadius] = useState(0)

  React.useLayoutEffect(() => {
    outer.current.position.set(0, 0, 0)
    outer.current.updateWorldMatrix(true, true)
    const box3 = new THREE.Box3().setFromObject(inner.current)
    const center = new THREE.Vector3()
    const sphere = new THREE.Sphere()
    const height = box3.max.y - box3.min.y
    box3.getCenter(center)
    box3.getBoundingSphere(sphere)
    setRadius(sphere.radius)
    outer.current.position.set(-center.x, -center.y + height / 2, -center.z)
  }, [])

  React.useLayoutEffect(() => {
    camera.position.set(0, radius * 1.5, radius * 2.5)
    camera.near = 1
    camera.far = Math.max(5000, radius * 4)
    camera.lookAt(0, 0, 0)
  }, [radius])

  return (
    <group ref={ref} {...props}>
      <group ref={outer}>
        <group ref={inner}>
          <Model />
        </group>
      </group>
      <ContactShadows
        rotation-x={Math.PI / 2}
        position={[0, 0, 0]}
        opacity={1}
        width={radius * 2}
        height={radius * 2}
        blur={2}
        far={radius / 2}
      />
      <spotLight position={[radius, radius * 2, radius]} intensity={1} castShadow />
      <pointLight position={[-radius * 2, -radius * 2, -radius * 2]} />
    </group>
  )
})

const Viewer = () => {
  return (
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 150], fov: 50 }}>
      <Suspense fallback={null}>
        <Stage />
        <Environment preset="warehouse" />
      </Suspense>
      <OrbitControls autoRotate />
    </Canvas>
  )
}

export default Viewer              
          `,
    },
    'src/style.css': {
      content: `body,
        #root {
          height: 100vh;
          width: 100vw;
        }
        `,
    },
    [`public/${fileName}`]: {
      content: textOriginalFile,
      isBinary: fileName.includes('glb'),
    },
    [`src/Model.${types ? 'tsx' : 'js'}`]: { content: code },
    'package.json': {
      content: {
        dependencies: {
          '@react-three/drei': '^4.0.4',
          '@react-three/fiber': '^6.0.9',
          react: '^17.0.2',
          'react-dom': '^17.0.2',
          three: '0.127.0',
        },
      },
    },
  },
})
