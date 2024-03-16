import { saveAs } from 'file-saver'
import { create } from 'zustand'
import * as THREE from 'three'
import { createZip } from '../utils/createZip'
import { parse } from 'gltfjsx'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

const loadingManager = new THREE.LoadingManager()
const gltfLoader = new GLTFLoader(loadingManager)
const dracoloader = new DRACOLoader()
dracoloader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
gltfLoader.setDRACOLoader(dracoloader)
gltfLoader.setMeshoptDecoder(MeshoptDecoder)

const useStore = create((set, get) => ({
  fileName: '',
  buffers: null,
  textOriginalFile: '',
  animations: false,
  code: '',
  scene: null,
  createZip: async ({ sandboxCode }) => {
    await import('../utils/createZip').then((mod) => mod.createZip)
    const { fileName } = get()
    const blob = await createZip({ sandboxCode })

    saveAs(blob, `${fileName.split('.')[0]}.zip`)
  },
  generateScene: async (config) => {
    const { fileName, buffers } = get()
    let result
    if (buffers.length !== 1) {
      result = await new Promise((resolve, reject) => {
        const objectURLs = []

        // return objectUrl blob build from the buffer map
        loadingManager.setURLModifier((path) => {
          const buffer = buffers.get(path)

          const url = URL.createObjectURL(new Blob([buffer]))

          objectURLs.push(url)

          return url
        })

        const gltfBuffer = buffers.get(fileName)

        const onLoad = (gltf) => {
          // clean up
          objectURLs.forEach(URL.revokeObjectURL)
          loadingManager.setURLModifier = THREE.DefaultLoadingManager.setURLModifier

          resolve(gltf)
        }

        gltfLoader.parse(gltfBuffer, fileName.slice(0, fileName.lastIndexOf('/') + 1), onLoad, reject)
      })
    } else {
      result = await new Promise((resolve, reject) => gltfLoader.parse(buffers[0], '', resolve, reject))
    }
    const code = await parse(result, { ...config, fileName, printwidth: 100 })

    set({
      code,
      animations: !!result.animations.length,
    })
    if (!get().scene) set({ scene: result.scene })
  },
}))

export default useStore
