export const loadFileAsArrayBuffer = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onabort = reject
    reader.onerror = reject
    reader.onload = () => resolve(reader.result)
    reader.readAsArrayBuffer(file)
  })

export const stringToArrayBuffer = (text, encoding = 'UTF-8') => {
  return new Promise((resolve, reject) => {
    const blob = new Blob([text], { type: `text/plain;charset=${encoding}` })
    const reader = new FileReader()
    reader.onload = (evt) => {
      if (evt.target) {
        resolve(evt.target.result)
      } else {
        reject(new Error('Could not convert string to array!'))
      }
    }
    reader.readAsArrayBuffer(blob)
  })
}
