const loadFileAsArrayBuffer = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onabort = reject
    reader.onerror = reject
    reader.onload = () => resolve(reader.result)
    reader.readAsArrayBuffer(file)
  })

export default loadFileAsArrayBuffer
