export const getFileExtension = (file) => file.split('.').pop()

export const IsJson = (file) => file.split('.').pop() === 'json'

export const isGlb = (file) => file.split('.').pop() === 'glb'
