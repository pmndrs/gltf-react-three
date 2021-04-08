const arrayBufferToString = (buffer, callback) => {
  var blob = new Blob([buffer], { type: 'text/plain' })
  var reader = new FileReader()
  reader.onload = function (evt) {
    callback(evt.target.result)
  }
  reader.readAsText(blob, 'utf-8')
}

export default arrayBufferToString
