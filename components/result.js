import React, { useEffect, useState } from 'react'
import { GLTFLoader, DRACOLoader } from 'three-stdlib'
import parse from '@react-three/gltfjsx'
import Nav from './nav'
import Viewer from './viewer'
import Code from './code'

const gltfLoader = new GLTFLoader()
const dracoloader = new DRACOLoader()
dracoloader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
gltfLoader.setDRACOLoader(dracoloader)

const Result = (props) => {
  const [code, setCode] = useState()
  const [scene, setScene] = useState()
  const [config, setConfig] = useState({ types: false, shadows: true })
  const { fileName, buffer, ...rest } = props

  useEffect(async () => {
    const result = await new Promise((resolve, reject) => gltfLoader.parse(buffer, '', resolve, reject))
    setCode(parse(fileName, result, config))
    if (!scene) setScene(result.scene)
  }, [config])

  if (!code && !scene) return <p className="text-4xl font-bold">Loading ...</p>

  return (
    <div className="min-h-screen w-screen ">
      <div className="grid grid-cols-5">
        {code && <Code>{code}</Code>}
        <div className="grid grid-rows-autofill col-span-2">
          <Nav config={config} setConfig={setConfig} code={code} buffer={buffer} fileName={fileName} {...rest} />
          <section className="h-full w-full">{scene && <Viewer scene={scene} />}</section>
        </div>
      </div>
    </div>
  )
}

export default Result
