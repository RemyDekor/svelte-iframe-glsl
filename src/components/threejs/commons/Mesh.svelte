<script lang="ts">
  // Instance script, executed for each component call
  import { onMount, getContext, setContext, afterUpdate } from "svelte"
  import * as THREE from "three"

  export let geometry: THREE.BufferGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
  export let material: THREE.Material = new THREE.MeshNormalMaterial()
  export let position: [number, number, number] = [0, 0, 0]
  export let scale: [number, number, number] = [1, 1, 1]
  export let rotation: [number, number, number] = [0, 0, 0]
  export let quaternion: [number, number, number, number] = [0, 0, 0, 1]
  // TODO: visibility = "visible" || "hidden" (use threejs layers maybe)

  const mesh = new THREE.Mesh(geometry, material)
  $: mesh.geometry = geometry
  $: mesh.material = material
  $: mesh.position.set(...position)
  $: mesh.scale.set(...scale)
  $: mesh.rotation.set(...rotation)
  $: mesh.quaternion.set(...quaternion)

  // ask for re-render when updated
  const canvasCtxState = getContext("canvas")
  const { rendererNeedsUpdate } = canvasCtxState
  afterUpdate(() => {
    rendererNeedsUpdate.set(true)
  })

  const parentCtxState = getContext("parent")
  const { parent }: { parent: THREE.Object3D } = parentCtxState

  setContext("parent", {
    get parent() {
      return mesh
    },
  })

  onMount(() => {
    parent.add(mesh)

    return function onDestroy() {
      parent.remove(mesh)
    }
  })
</script>

<slot />
