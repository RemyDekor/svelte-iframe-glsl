<script lang="ts">
  import * as THREE from "three"
  import { onMount, getContext } from "svelte"

  export let position: [number, number, number] = [0, 0, 3]
  export let target: THREE.Vector3 = new THREE.Vector3()
  export let isUpdatingLookAt: boolean = false

  const canvasCtxState = getContext("canvas")
  const { canvas, cameras, activeCamera } = canvasCtxState

  const camera = new THREE.PerspectiveCamera(
    45,
    1, // cant'access canvas yet: canvas.clientWidth / canvas.clientHeight,
    0.001,
    500
  )
  $: camera.position.set(...position)
  $: camera.lookAt(target)
  $: if (isUpdatingLookAt && target && position) camera.lookAt(target)

  export let key
  $: {
    if (key) camera.key = key
    cameras.add(camera)
  }

  $: if ($canvas) camera.aspect = $canvas.clientWidth / $canvas.clientHeight

  onMount(() => {
    return function destroy() {
      //clean up
    }
  })
</script>
