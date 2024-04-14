export const getFileExtension = (file) => file?.split('.').pop()

export const isJson = (file) => file?.split('.').pop() === 'json'

export const isGlb = (file) => file?.split('.').pop() === 'glb'

export const isGltf = (file) => file?.split('.').pop() === 'gltf'

export const isZip = (file) => file?.split('.').pop() === 'zip'
