<script lang="ts">
  import * as THREE from "three"
  import Camera from "./Camera.svelte"
  import Scene from "./Scene.svelte"
  import { onMount, setContext, tick } from "svelte"
  import { writable } from "svelte/store"
  import { createCameras } from "./utlis/stores"

  // stores adeed in canvasCtxState
  const canvas = writable(null)
  const cameras = createCameras()
  const activeScene = writable(null)
  const activeCamera = writable(null)

  let canvasRef = null

  const canvasCtxState = {
    canvas,
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

  onMount(() => {
    canvas.set(canvasRef)

    const renderer = new THREE.WebGLRenderer({
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

    // TODO: PERFORMANCE: do not use a loop for rendering, unless there is a shader using time as input
    const renderLoop = () => {
      requestAnimationFrame(renderLoop)
      renderer.render($activeScene, $activeCamera)
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
