<script lang="ts">
  // Instance script, executed for each component call
  import { onMount } from "svelte"
  import * as THREE from "three"
  import { getContext } from "svelte"

  export let position: [number, number, number] = [0, 0, 0]
  export let scale: [number, number, number] = [0, 0, 0]
  export let rotation: [number, number, number] = [0, 0, 0]
  export let quaternion: [number, number, number, number] = [0, 0, 0, 1]
  // TODO: visibility = "visible" || "hidden" (use threejs layers maybe)

  const group = new THREE.Group()
  $: group.position.set(...position)
  $: group.scale.set(...scale)
  $: group.rotation.set(...rotation)
  $: group.quaternion.set(...quaternion)

  const canvasCtxState = getContext(canvasCtxKey)
  let scene: THREE.Scene
  $: ({ scene } = $canvasCtxState)

  onMount(() => {
    scene.add(group)

    return function onDestroy() {
      scene.remove(group)
    }
  })
</script>

<slot />
