import { writable } from "svelte/store"
import type * as THREE from "three"

function createCameras() {
  const { subscribe, set, update } = writable([])

  return {
    subscribe,
    add: (camera: THREE.Camera) =>
      update((camArray) => {
        const array = Array.from(camArray)
        array.push(camera)
        return array
      }),
    remove: (key: String) =>
      update((camArray) => {
        const array = camArray.filter((cam) => cam.key !== key)
        return array
      }),
  }
}

function createScenes() {
  const { subscribe, set, update } = writable([])

  return {
    subscribe,
    add: (scene: THREE.Scene) =>
      update((sceneArray) => {
        const array = Array.from(sceneArray)
        array.push(scene)
        return array
      }),
    remove: (key: String) =>
      update((sceneArray) => {
        const array = sceneArray.filter((scene) => scene.key !== key)
        return array
      }),
  }
}

function createRenderNeedsUpdate() {
  const { subscribe, set, update } = writable(false)

  return {
    subscribe,
    set,
  }
}

export { createCameras, createScenes, createRenderNeedsUpdate }
