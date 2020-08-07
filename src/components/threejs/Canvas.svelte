<script context="module">
  export const canvasCtxKey = {}
</script>

<script>
  import * as THREE from "three"
  import { onMount, setContext, tick } from "svelte"
  import { writable } from "svelte/store"

  let canvasRef

  const scene = new THREE.Scene()

  const canvasCtxState = writable({
    get scene() {
      return scene
    },
  })

  setContext(canvasCtxKey, canvasCtxState)

  onMount(() => {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef,
      antialias: true,
      // alpha: true,
    })

    const camera = new THREE.PerspectiveCamera(
      45,
      canvasRef.clientWidth / canvasRef.clientHeight,
      0.001,
      500
    )
    camera.position.z = 3
    camera.lookAt(new THREE.Vector3())

    const onWindowResize = () => {
      const width = canvasRef.clientWidth
      const height = canvasRef.clientHeight

      renderer.setSize(width, height)

      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    // TODO: PERFORMANCE: do not use a loop for rendering, unless there is a shader using time as input
    const renderLoop = () => {
      requestAnimationFrame(renderLoop)
      renderer.render(scene, camera)
    }

    window.addEventListener("resize", onWindowResize)
    onWindowResize()
    renderLoop()

    return function destroy() {
      window.removeEventListener("resize", onWindowResize)
      renderer.dispose()
      scene.dispose()
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
