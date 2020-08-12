<script lang="ts">
  import * as THREE from "three"
  import Camera from "./Camera.svelte"
  import Scene from "./Scene.svelte"
  import { onMount, setContext, afterUpdate, tick } from "svelte"
  import { writable } from "svelte/store"
  import { createCameras, createRenderNeedsUpdate } from "../utils/stores"

  // stores adeed in canvasCtxState
  const canvas = writable(null)
  const rendererNeedsUpdate = createRenderNeedsUpdate()
  const cameras = createCameras()
  const activeScene = writable(null)
  const activeCamera = writable(null)

  let renderer: THREE.WebGLRenderer
  let canvasRef = null

  const canvasCtxState = {
    canvas,
    rendererNeedsUpdate,
    cameras,
    activeScene,
    activeCamera,
  }

  setContext("canvas", canvasCtxState)

  export let camKey: String = null
  $: if (camKey) {
    const foundCamera = $cameras.find((cam) => cam.key === camKey)
    if (foundCamera) {
      activeCamera.set(foundCamera)
      updateCamAspect(foundCamera)
    }
  }

  let canvasWidth: number
  let canvasHeight: number

  const updateCamAspect = (camera: THREE.PerspectiveCamera): void => {
    camera.aspect = canvasWidth / canvasHeight
    camera.updateProjectionMatrix()
  }

  // maybe there is a special rendererNeedsUpdate case when a variable time is used
  // also should we have some kind of logic to detect out-of-view objects and not render them (check culling? might be unecessary to do this logic in js)

  // TODO: set rendererNeedsUpdate to true in every base objects
  // (Mesh/Lights/Group/Camera... when they update (check Mesh.svelte for reference)
  // $: if ($rendererNeedsUpdate) render()

  function renderLoop() {
    requestAnimationFrame(renderLoop)
    if ($rendererNeedsUpdate) {
      // console.log("✨render")
      renderer.render($activeScene, $activeCamera)
      rendererNeedsUpdate.set(false)
    }
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

      updateCamAspect($activeCamera)
    }

    window.addEventListener("resize", onWindowResize)
    onWindowResize()
    renderLoop()

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
