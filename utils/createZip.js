import JSZip from 'jszip'
import { isJson } from './isExtension'

export const createZip = async ({ sandboxCode }) => {
  var zip = new JSZip()
  Object.keys(sandboxCode.files).forEach((file) => {
    if (file.startsWith('public') && file !== 'public/index.html')
      zip.file(file, sandboxCode.files[file].content, { base64: true })
    else
      zip.file(
        file,
        isJson(file) ? JSON.stringify(sandboxCode.files[file].content, null, 2) : sandboxCode.files[file].content
      )
  })

  const blob = await zip.generateAsync({ type: 'blob' })

  return blob
}
