import { useState, useCallback } from 'react'

import dynamic from 'next/dynamic'
import suzanne from '../public/suzanne.gltf'
import SEO from '../components/SEO'
import FileDrop from '../components/fileDrop'
import arrayBufferToString from '../utils/arrayBufferToString'
import { GitHub, Logo } from '../components/icons'

const Loading = () => <p className="text-4xl font-bold">Loading ...</p>

const Result = dynamic(() => import('../components/result'), {
  ssr: false,
  loading: Loading,
})

export default function Home() {
  const [fileName, setFileName] = useState('')
  const [buffer, setBuffer] = useState()
  const [textOriginalFile, setTextOriginalFile] = useState()

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onabort = () => console.error('file reading was aborted')
      reader.onerror = () => console.error('file reading has failed')
      reader.onload = async () => {
        const data = reader.result
        setBuffer(data)
        setFileName(file.name)
        arrayBufferToString(data, (a) => setTextOriginalFile(a))
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])

  const useSuzanne = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setBuffer(suzanne)
    setFileName('suzanne.gltf')
    setTextOriginalFile(suzanne)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SEO />
      <main className="flex flex-col items-center justify-center flex-1">
        {buffer ? (
          <Result textOriginalFile={textOriginalFile} buffer={buffer} fileName={fileName}></Result>
        ) : (
          <FileDrop onDrop={onDrop} useSuzanne={useSuzanne} />
        )}
      </main>
      <footer className="p-4 flex items-center justify-between w-full">
        <a href="https://pmnd.rs/" target="_blank" rel="noreferrer">
          <Logo />
        </a>
        <p className="text-xs">
          Made by{' '}
          <a
            className="underline hover:text-blue-600"
            href="https://twitter.com/NikkitaFTW"
            target="_blank"
            rel="noreferrer">
            @NikkitaFTW
          </a>{' '}
          &{' '}
          <a
            className="underline hover:text-blue-600"
            href="https://github.com/pmndrs/gltf-react-three/graphs/contributors">
            contributors
          </a>
        </p>
        <a href="https://github.com/pmndrs/gltf-react-three/" target="_blank" rel="noreferrer">
          <GitHub />
        </a>
      </footer>
    </div>
  )
}
