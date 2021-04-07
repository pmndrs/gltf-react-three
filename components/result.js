import React, { useEffect, useState } from 'react'
import { parse } from '../lib/gltsfx'
import Nav from './nav'
import Viewer from './viewer'
import Code from './code'

const Result = (props) => {
  const [jsx, setJSX] = useState()
  const [scene, setScene] = useState()
  const [types, setTypes] = useState(false)
  const { fileName, originalFile, ...rest } = props

  useEffect(async () => {
    const parsed = await parse(fileName, originalFile, types)
    setJSX(parsed.jsx)
    if (!scene) {
      setScene(parsed.scene)
    }
  }, [types])

  if (!jsx && !scene) return <p className="text-4xl font-bold">Loading ...</p>

  return (
    <div className="min-h-screen w-screen ">
      <div className="grid grid-cols-5">
        {jsx && <Code jsx={jsx} />}
        <div className="grid grid-rows-autofill col-span-2">
          <Nav types={types} setTypes={setTypes} code={jsx} fileName={fileName} {...rest} />
          <section className="h-full w-full">{scene && <Viewer scene={scene} />}</section>
        </div>
      </div>
    </div>
  )
}

export default Result
