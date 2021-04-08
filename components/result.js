import React, { useEffect, useState } from 'react'
import { GLTFLoader, DRACOLoader } from 'three-stdlib'
import { parse } from '../lib/gltsfx'
import Nav from './nav'
import Viewer from './viewer'
import Code from './code'

const gltfLoader = new GLTFLoader()
const dracoloader = new DRACOLoader()
dracoloader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
gltfLoader.setDRACOLoader(dracoloader)

const Result = (props) => {
  const [jsx, setJSX] = useState()
  const [scene, setScene] = useState()
  const [config, setConfig] = useState({ types: false, shadows: true })
  const { fileName, buffer, ...rest } = props

  useEffect(async () => {
    const result = await new Promise((resolve, reject) => gltfLoader.parse(buffer, '', resolve, reject))
    setJSX(parse(fileName, result, config))
    if (!scene) setScene(result.scene)
  }, [config])

  if (!jsx && !scene) return <p className="text-4xl font-bold">Loading ...</p>

  return (
    <div className="min-h-screen w-screen ">
      <div className="grid grid-cols-5">
        {jsx && <Code jsx={jsx} />}
        <div className="grid grid-rows-autofill col-span-2">
          <Nav config={config} setConfig={setConfig} code={jsx} fileName={fileName} {...rest} />
          <section className="h-full w-full">{scene && <Viewer scene={scene} />}</section>
        </div>
      </div>
    </div>
  )
}

export default Result
