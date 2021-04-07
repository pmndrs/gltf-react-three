import React, { useEffect, useState } from 'react'
import { parse } from '../lib/gltsfx'
import Nav from './nav'
import Viewer from './viewer'
import Code from './code'

const Result = (props) => {
  const [data, setData] = useState()
  const [types, setTypes] = useState(false)
  const { fileName, originalFile, ...rest } = props

  useEffect(async () => {
    const parsed = await parse(fileName, originalFile, types)
    setData(parsed)
  }, [types])

  if (!data) return <p className="text-4xl font-bold">Loading ...</p>
  const { jsx, scene } = data
  return (
    <div className="min-h-screen w-screen ">
      <div className="grid grid-cols-3">
        <Code jsx={jsx} />
        <div className="h-screen">
          <Nav types={types} setTypes={setTypes} code={jsx} fileName={fileName} {...rest} />
          <section className="h-full">
            <Viewer scene={scene} />
          </section>
        </div>
      </div>
    </div>
  )
}

export default Result
