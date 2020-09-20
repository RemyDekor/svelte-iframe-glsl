<script lang="ts">
  import * as THREE from "three"
  import Camera from "./Camera.svelte"
  import Scene from "./Scene.svelte"
  import { onMount, setContext, afterUpdate, tick } from "svelte"
  import { writable } from "svelte/store"
  import {
    createCameras,
    createScenes,
    createRenderNeedsUpdate,
  } from "../utils/stores"

  // stores adeed in canvasCtxState
  const canvas = writable(null)
  const rendererNeedsUpdate = createRenderNeedsUpdate()
  const cameras = createCameras()
  const scenes = createScenes()
  const activeScene = writable(null)
  const activeCamera = writable(null)

  let renderer: THREE.WebGLRenderer
  let canvasRef = null

  const canvasCtxState = {
    canvas,
    rendererNeedsUpdate,
    cameras,
    scenes,
    activeScene,
    activeCamera,
  }

  setContext("canvas", canvasCtxState)

  export let activeCamKey: string = ""
  $: {
    if (activeCamKey === "" && !$activeCamera) {
      $cameras[0] ? activeCamera.set($cameras[0]) : console.error("No camera found")
    } else {
      const foundCamera: THREE.Camera = $cameras.find(
        (cam) => cam.key === activeCamKey
      )
      if (foundCamera) {
        activeCamera.set(foundCamera)
        if (foundCamera instanceof THREE.PerspectiveCamera)
          updateCamAspect(foundCamera)
      } else {
        console.error(`Could not find camera with key "${activeCamKey}"`)
      }
    }
  }

  export let activeSceneKey: string = ""
  $: {
    if (activeSceneKey === "" && !$activeScene) {
      $scenes[0] ? activeScene.set($scenes[0]) : console.error("No scene found")
    } else {
      const foundScene: THREE.Scene = $scenes.find(
        (scene) => scene.key === activeSceneKey
      )
      if (foundScene) activeScene.set(foundScene)
      else console.error(`Could not find scene with key "${activeSceneKey}"`)
    }
  }

  let canvasWidth: number
  let canvasHeight: number

  const updateCamAspect = (camera: THREE.PerspectiveCamera): void => {
    camera.aspect = canvasWidth / canvasHeight
    camera.updateProjectionMatrix()
  }

  // should we have some kind of logic to detect out-of-view objects and not re-render when they update
  // (check culling? might be unecessary to do this logic in js)

  // TODO: set rendererNeedsUpdate to true in every base objects
  // (Mesh/Lights/Group/Camera... when they update (check Mesh.svelte for reference)

  $: if ($rendererNeedsUpdate && $activeCamera && $activeScene)
    requestAnimationFrame(frame)

  function frame() {
    // console.log("✨frame")
    renderer.render($activeScene, $activeCamera)
    rendererNeedsUpdate.set(false)
  }

  onMount(() => {
    canvas.set(canvasRef)

    renderer = new THREE.WebGLRenderer({
      canvas: $canvas,
      antialias: true,
      // alpha: true,
    })

    const onWindowResize = () => {
      canvasWidth = $canvas.clientWidth
      canvasHeight = $canvas.clientHeight

      renderer.setSize(canvasWidth, canvasHeight)

      if ($activeCamera) updateCamAspect($activeCamera)
    }

    window.addEventListener("resize", onWindowResize)
    onWindowResize()

    return function destroy() {
      console.log("dispose of renderer")
      window.removeEventListener("resize", onWindowResize)
      renderer.dispose()
    }
  })
</script>

<canvas bind:this={canvasRef} />
<slot />

<style>
  canvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
  }
</style>
