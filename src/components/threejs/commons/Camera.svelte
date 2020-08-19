<script lang="ts">
  import * as THREE from "three"
  import { onMount, afterUpdate, getContext } from "svelte"

  export let position: [number, number, number] = [0, 0, 3]
  export let target: THREE.Vector3 = new THREE.Vector3()
  export let fov: number = 45
  export let near: number = 0.001
  export let far: number = 500
  export let isUpdatingLookAt: boolean = false

  const canvasCtxState = getContext("canvas")
  const { canvas, cameras, activeCamera, rendererNeedsUpdate } = canvasCtxState

  // TODO: OrthoCamera
  const camera = new THREE.PerspectiveCamera(fov, 1, near, far)
  $: camera.position.set(...position)
  $: camera.lookAt(target)
  $: camera.fov = fov
  $: camera.near = near
  $: camera.far = far
  $: if (isUpdatingLookAt && target && position) camera.lookAt(target)

  export let key: string = ""
  $: {
    camera.key = key
    cameras.add(camera)
  }

  $: if ($activeCamera && $canvas)
    camera.aspect = $canvas.clientWidth / $canvas.clientHeight

  // ask for re-render when camera is updated (&& if is activeCamera)
  afterUpdate(() => {
    if ($activeCamera && $activeCamera.key === camera.key)
      rendererNeedsUpdate.set(true)
  })

  onMount(() => {
    return function destroy() {
      //clean up
      cameras.remove(camera.key)
    }
  })
</script>
