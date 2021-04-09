import { useDropzone } from 'react-dropzone'

const FileDrop = ({ onDrop, useSuzanne }) => {
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: '.gltf, .glb',
  })

  return (
    <div className="h-full w-screen flex flex-col items-center justify-center text-center" {...getRootProps()}>
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
  )
}

export default FileDrop
