import { saveAs } from 'file-saver'
import create from 'zustand'
import { createZip } from '../utils/createZip'
import parse from '@react-three/gltfjsx'
import { GLTFLoader, DRACOLoader, MeshoptDecoder } from 'three-stdlib'

const gltfLoader = new GLTFLoader()
const dracoloader = new DRACOLoader()
dracoloader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
gltfLoader.setDRACOLoader(dracoloader)
gltfLoader.setMeshoptDecoder(MeshoptDecoder)

const useStore = create((set, get) => ({
  fileName: '',
  buffer: null,
  textOriginalFile: '',
  code: '',
  scene: null,
  createZip: async ({ sandboxCode }) => {
    await import('../utils/createZip').then((mod) => mod.createZip)
    const { fileName, textOriginalFile, buffer } = get()
    const blob = await createZip({ sandboxCode, fileName, textOriginalFile, buffer })

    saveAs(blob, `${fileName.split('.')[0]}.zip`)
  },
  generateScene: async (config) => {
    const { fileName, buffer } = get()
    const result = await new Promise((resolve, reject) => gltfLoader.parse(buffer, '', resolve, reject))
    const code = parse(fileName, result, { ...config, printwidth: 100 })
    set({ code })
    if (!get().scene) set({ scene: result.scene })
  },
}))

export default useStore
