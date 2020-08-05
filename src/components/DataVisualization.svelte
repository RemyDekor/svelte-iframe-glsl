<script>
  import { onMount } from "svelte"
  import { throttle } from "../utils"
  import SceneManager from "../threejs/SceneManager"

  export let data

  let canvasRef
  let entryPoint

  const onWindowResize = throttle(() => {
    entryPoint.onWindowResize()
  }, 50)

  onMount(() => {
    window.addEventListener("resize", onWindowResize)
    entryPoint = SceneManager({ canvas: canvasRef })

    return function onDestroy() {
      window.removeEventListener("resize", onWindowResize)
      entryPoint.destroy()
    }
  })
</script>

<div class="canvasContainer">
  <canvas bind:this={canvasRef} />
</div>
<p>here is your data: {JSON.stringify(data)}</p>

<style>
  p {
    color: green;
  }

  .canvasContainer {
    width: 100%;
    height: 100%;
  }

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
</style>
