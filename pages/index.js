import Head from "next/head";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import dynamic from "next/dynamic";

const Code = dynamic(() => import("../components/code"), {
  ssr: false,
  loading: () => <p className="text-4xl font-bold">Loading ...</p>,
});

export default function Home() {
  const [types, setTypes] = useState(false);

  const [fileName, setFileName] = useState("");
  const [originalFile, setOriginalFile] = useState();
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        const data = reader.result;
        setOriginalFile(data);
        setFileName(file.name);
      };
      reader.readAsText(file);
    });
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
  } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: ".gltf, .glb",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-night-dark text-white">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 ">
        {originalFile ? (
          <Code
            types={types}
            originalFile={originalFile}
            fileName={fileName}
            setTypes={() => setTypes((t) => !t)}
          ></Code>
        ) : (
          <div
            className="h-screen w-screen flex flex-col items-center justify-center text-center"
            {...getRootProps()}
          >
            <input {...getInputProps()} />

            {isDragActive ? (
              <p className="text-4xl font-bold text-blue-600">
                Drop the files here ...
              </p>
            ) : (
              <p className="text-4xl font-bold ">
                Drag 'n' drop your GLTF file{" "}
                <span className="text-blue-600">here</span>
              </p>
            )}
            {fileRejections.length ? (
              <p className="block text-center text-xl pt-4 text-red-300">
                Only .gltf or .glb files are accepted
              </p>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
}
