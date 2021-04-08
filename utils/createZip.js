import JSZip from 'jszip'
import { isGlb, isJson } from './isExtension'

export const createZip = async ({ sandboxCode, fileName, textOriginalFile, buffer }) => {
  var zip = new JSZip()
  Object.keys(sandboxCode.files).map((file) => {
    if (file === `public/${fileName}`) {
      zip.file(`public/${fileName}`, isGlb(fileName) ? buffer : textOriginalFile, {
        isBinary: isGlb(fileName),
      })
    } else {
      zip.file(
        file,
        isJson(file) ? JSON.stringify(sandboxCode.files[file].content, null, 2) : sandboxCode.files[file].content
      )
    }
  })

  const blob = await zip.generateAsync({ type: 'blob' })

  return blob
}
