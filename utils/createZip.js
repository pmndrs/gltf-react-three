import JSZip from 'jszip'

export const createZip = async ({ sandboxCode, fileName, textOriginalFile, buffer }) => {
  var zip = new JSZip()
  Object.keys(sandboxCode.files).map((file) => {
    if (file === `public/${fileName}`) {
      zip.file(`public/${fileName}`, fileName.includes('.glb') ? buffer : textOriginalFile, {
        isBinary: fileName.includes('.glb'),
      })
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
