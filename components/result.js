import React, { useEffect, useMemo, useCallback } from 'react'
import copy from 'clipboard-copy'
import { Leva, useControls, button } from 'leva'
import toast from 'react-hot-toast'
import { isGlb } from '../utils/isExtension'
import useSandbox from '../utils/useSandbox'
import Viewer from './viewer'
import Code from './code'
import useStore from '../utils/store'

const Result = () => {
  const { buffer, fileName, textOriginalFile, scene, code, createZip, generateScene } = useStore()

  const config = useControls({
    types: false,
    shadows: true,
    verbose: false,
    meta: false,
    precision: { value: 2, min: 1, max: 8, step: 1 },
  })

  const [loading, sandboxId, error, sandboxCode] = useSandbox({ fileName, textOriginalFile, code, config })

  useEffect(async () => {
    generateScene(config)
  }, [config])

  const download = useCallback(async () => {
    createZip({ sandboxCode })
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

    if (!isGlb(fileName) && !error) {
      const name = 'codesandbox' + (loading ? ' loading' : '')
      temp[name] = button(() => {
        location.href = sandboxId
          ? `https://codesandbox.io/s/${sandboxId}?file=/src/Model.${config.types ? 'tsx' : 'js'}`
          : '#'
      })
    }
    return temp
  }, [fileName, loading, error, sandboxCode, sandboxId, config.types])

  useControls('exports', exports, { collapsed: true }, [exports])

  if (!code && !scene) return <p className="text-4xl font-bold">Loading ...</p>

  return (
    <div className="h-full w-screen" style={{ height: 'calc(100vh - 56px)' }}>
      <div className="grid grid-cols-5">
        {code && <Code>{code}</Code>}
        <section className="h-full w-full col-span-2">{scene && <Viewer scene={scene} />}</section>
      </div>
      <Leva titleBar={{ title: 'config' }} collapsed />
    </div>
  )
}

export default Result
