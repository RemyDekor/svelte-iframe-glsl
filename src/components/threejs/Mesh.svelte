<script context="module">
  // Abstraction(module) script, executed only once,
  // even if the component is called several times.
  // can NOT receive props in this part of the component
  // can export variables to other files
</script>

<script lang="ts">
  // Instance script, executed for each component call
  import { onMount } from "svelte"
  import * as THREE from "three"
  import { getContext } from "svelte"
  import { canvasCtxKey } from "./Canvas.svelte"

  export let geometry = new THREE.BoxBufferGeometry(1, 1, 1)
  export let material = new THREE.MeshNormalMaterial()
  export let position: [number, number, number] = [0, 0, 0]
  export let scale: [number, number, number] = [0, 0, 0]
  export let rotation: [number, number, number] = [0, 0, 0]
  export let quaternion: [number, number, number, number] = [0, 0, 0, 1]

  const mesh = new THREE.Mesh(geometry, material)
  $: mesh.geometry = geometry
  $: mesh.material = material
  $: mesh.position.set(...position)
  $: mesh.scale.set(...scale)
  $: mesh.rotation.set(...rotation)
  $: mesh.quaternion.set(...quaternion)

  const canvasCtxState = getContext(canvasCtxKey)
  let scene: THREE.Scene
  $: ({ scene } = $canvasCtxState)

  onMount(() => {
    scene.add(mesh)

    return function onDestroy() {
      scene.remove(mesh)
    }
  })
</script>

<slot />
