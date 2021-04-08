import Head from 'next/head'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import dynamic from 'next/dynamic'
import suzanne from '../public/suzanne.gltf'

const Loading = () => <p className="text-4xl font-bold">Loading ...</p>

const Result = dynamic(() => import('../components/result'), {
  ssr: false,
  loading: Loading,
})

function arrayBufferToString(buffer, callback) {
  var blob = new Blob([buffer], { type: 'text/plain' })
  var reader = new FileReader()
  reader.onload = function (evt) {
    callback(evt.target.result)
  }
  reader.readAsText(blob, 'utf-8')
}

export default function Home() {
  const [fileName, setFileName] = useState('')
  const [buffer, setBuffer] = useState()
  const [textOriginalFile, setTextOriginalFile] = useState()
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = async () => {
        const data = reader.result
        setBuffer(data)
        setFileName(file.name)
        arrayBufferToString(data, (a) => setTextOriginalFile(a))
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: '.gltf, .glb',
  })

  const useSuzanne = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setBuffer(suzanne)
    setFileName('suzanne.gltf')
    setTextOriginalFile(suzanne)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <title>GLTF {'->'} React Three Fiber </title>
        <meta
          name="description"
          content="Easily convert GLTF models into React Three Fiber components to use in your projects"></meta>
      </Head>

      <main className="flex flex-col items-center justify-center flex-1">
        {buffer ? (
          <Result textOriginalFile={textOriginalFile} fileName={fileName}></Result>
        ) : (
          <div className="h-screen w-screen flex flex-col items-center justify-center text-center" {...getRootProps()}>
            <input {...getInputProps()} />

            {isDragActive ? (
              <p className="text-4xl font-bold text-blue-600">Drop the files here ...</p>
            ) : (
              <p className="text-4xl font-bold ">
                Drag {"'"}n{"'"} drop your GLTF file <span className="text-blue-600">here</span> or{' '}
                <button className="font-bold" onClick={useSuzanne}>
                  try it with <span className="text-blue-600">Suzanne</span>
                </button>
              </p>
            )}
            {fileRejections.length ? (
              <p className="block text-center text-xl pt-4 text-red-300">Only .gltf or .glb files are accepted</p>
            ) : null}
          </div>
        )}
      </main>
    </div>
  )
}
