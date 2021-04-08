export const sandboxCode = ({ fileName, textOriginalFile, code, types }) => {
  const TSDeps = types
    ? {
        devDependencies: {
          '@types/react': '17.0.0',
          '@types/react-dom': '17.0.0',
          typescript: '4.1.3',
          'react-scripts': '4.0.3',
        },
      }
    : { 'react-scripts': '4.0.3' }
  return {
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
      [`src/index.${types ? 'tsx' : 'js'}`]: {
        content: `
import React from 'react'
import ReactDOM from "react-dom"
import './style.css'
import App from "./App"

ReactDOM.render(<App />, document.getElementById("root"))`,
      },
      [`src/App.${types ? 'tsx' : 'js'}`]: {
        content: `
import * as THREE from 'three'
import React, { Suspense, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import Model from './Model'

export default function Viewer() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 150], fov: 50 }}>
      <Suspense fallback={null}>
        <Stage contactShadow shadows adjustCamera environment="city">
          <Model />
        </Stage>
      </Suspense>
      <OrbitControls autoRotate />
    </Canvas>
  )
}`,
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
        content: fileName.includes('glb') ? btoa(unescape(encodeURIComponent(textOriginalFile))) : textOriginalFile,
      },
      [`src/Model.${types ? 'tsx' : 'js'}`]: { content: code },
      'package.json': {
        content: {
          dependencies: {
            '@react-three/drei': '^4.1.1',
            '@react-three/fiber': '^6.0.9',
            '@types/three': '0.127.0',
            react: '^17.0.2',
            'react-dom': '^17.0.2',
            three: '0.127.0',
          },
          ...TSDeps,
        },
      },
    },
  }
}
