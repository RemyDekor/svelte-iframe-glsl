<script lang="ts">
  import * as THREE from "three"
  import Camera from "./Camera.svelte"
  import Scene from "./Scene.svelte"
  import { onMount, setContext, tick } from "svelte"
  import { writable } from "svelte/store"

  const canvas = writable(null)
  const activeScene = writable(null)
  const activeCamera = writable(null)

  let canvasRef = null

  const canvasCtxState = {
    canvas,
    activeScene,
    activeCamera,
  }

  setContext("canvas", canvasCtxState)

  onMount(() => {
    canvas.set(canvasRef)

    const renderer = new THREE.WebGLRenderer({
      canvas: $canvas,
      antialias: true,
      // alpha: true,
    })

    const onWindowResize = () => {
      const width = $canvas.clientWidth
      const height = $canvas.clientHeight

      renderer.setSize(width, height)

      $activeCamera.aspect = width / height
      $activeCamera.updateProjectionMatrix()
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
<!-- default camera -->
<Camera />
<!-- default scene -->
<Scene>
  <slot />
</Scene>

<style>
  canvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
  }
</style>
