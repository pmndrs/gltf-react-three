import JSZip from 'jszip'

export const createZip = async (sandboxCode, fileName, textOriginalFile) => {
  var zip = new JSZip()
  Object.keys(sandboxCode.files).map((file) => {
    if (file === `public/${fileName}`) {
      zip.file(`public/${fileName}`, textOriginalFile)
    } else {
      zip.file(
        file,
        file.includes('.json')
          ? JSON.stringify(sandboxCode.files[file].content, null, 2)
          : sandboxCode.files[file].content
      )
    }
  })

  const blob = await zip.generateAsync({ type: 'blob' })

  return blob
}
