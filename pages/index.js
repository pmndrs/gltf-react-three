import Head from "next/head";
import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Code from "../components/code";

export default function Home() {
  const [code, setCode] = useState("");
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
        changeCode(data, file.name);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: ".gltf",
  });

  const changeCode = async (data = originalFile, name = fileName) => {
    const params = types ? `&types=true` : "";
    const code = await fetch("/api/transform?name=" + name + params, {
      method: "POST",
      body: data,
    }).then((rsp) => rsp.json());
    setCode(code.code);
  };

  useEffect(() => {
    if (originalFile && fileName) {
      changeCode();
    }
  }, [types]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>GLTF {"->"} React Three Fiber</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 ">
        {code ? (
          <Code
            code={code}
            types={types}
            setTypes={() => setTypes((t) => !t)}
          ></Code>
        ) : (
          <div
            className="h-screen w-screen flex items-center justify-center text-center"
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
          </div>
        )}
      </main>
    </div>
  );
}
