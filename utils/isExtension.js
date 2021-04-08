export const getFileExtension = (file) => file.split('.').pop()

export const isJson = (file) => file.split('.').pop() === 'json'

export const isGlb = (file) => file.split('.').pop() === 'glb'
