import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { GLTFLoader, DRACOLoader } from 'three-stdlib'
import parse from '@react-three/gltfjsx'
import copy from 'clipboard-copy'
import { saveAs } from 'file-saver'
import { Leva, useControls, button } from 'leva'
import toast from 'react-hot-toast'
import { isGlb } from '../utils/isExtension'
import useSandbox from '../utils/useSandbox'
import Viewer from './viewer'
import Code from './code'

const gltfLoader = new GLTFLoader()
const dracoloader = new DRACOLoader()
dracoloader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
gltfLoader.setDRACOLoader(dracoloader)

const Result = (props) => {
  const [code, setCode] = useState()
  const [scene, setScene] = useState()
  const { fileName, textOriginalFile, buffer, ...rest } = props
  const config = useControls({
    types: false,
    shadows: true,
    verbose: false,
    meta: false,
    precision: { value: 2, min: 1, max: 8, step: 1 },
  })

  const [loading, sandboxId, error, sandboxCode] = useSandbox({ fileName, textOriginalFile, code, config })

  const download = useCallback(async () => {
    const createZip = await import('../utils/createZip').then((mod) => mod.createZip)
    const blob = await createZip({ sandboxCode, fileName, textOriginalFile, buffer })
    saveAs(blob, `${fileName.split('.')[0]}.zip`)
  }, [sandboxCode, fileName, textOriginalFile, buffer])

  const exports = useMemo(() => {
    const temp = {}
    temp['copy to clipboard'] = button(() =>
      toast.promise(copy(code), {
        loading: 'Loading',
        success: () => `Successfully copied`,
        error: (err) => err.toString(),
      })
    )
    temp['download zip'] = button(() =>
      toast.promise(download(), {
        loading: 'Loading',
        success: () => `Ready for download`,
        error: (err) => err.toString(),
      })
    )

    if (!isGlb(fileName)) {
      temp['codesandbox' + (loading ? ' loading' : '') + (error ? ' ' + error : '')] = button(() => {
        location.href = `https://codesandbox.io/s/${sandboxId}?file=/src/Model.${config.types ? 'tsx' : 'js'}`
      })
    }

    return temp
  }, [fileName, loading, error, sandboxCode, sandboxId, config.types])

  useControls('exports', exports, { collapsed: true }, [exports])

  useEffect(async () => {
    const result = await new Promise((resolve, reject) => gltfLoader.parse(buffer, '', resolve, reject))
    setCode(parse(fileName, result, { ...config, printwidth: 100 }))
    if (!scene) setScene(result.scene)
  }, [config])

  if (!code && !scene) return <p className="text-4xl font-bold">Loading ...</p>

  return (
    <div className="h-full w-screen" style={{ height: 'calc(100vh - 56px)' }}>
      <div className="grid grid-cols-5">
        {code && <Code>{code}</Code>}
        <section className="h-full w-full col-span-2">{scene && <Viewer scene={scene} />}</section>
      </div>
      <Leva titleBar={{ title: 'config' }} />
    </div>
  )
}

export default Result
