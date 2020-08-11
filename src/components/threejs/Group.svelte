<script lang="ts">
  // Instance script, executed for each component call
  import { onMount } from "svelte"
  import * as THREE from "three"
  import { getContext, setContext } from "svelte"

  export let position: [number, number, number] = [0, 0, 0]
  export let scale: [number, number, number] = [1, 1, 1]
  export let rotation: [number, number, number] = [0, 0, 0]
  export let quaternion: [number, number, number, number] = [0, 0, 0, 1]
  // TODO: visibility = "visible" || "hidden" (use threejs layers maybe)

  const group = new THREE.Group()
  $: group.position.set(...position)
  $: group.scale.set(...scale)
  $: group.rotation.set(...rotation)
  $: group.quaternion.set(...quaternion)

  const parentCtxState = getContext("parent")
  const { parent }: { parent: THREE.Object3D } = parentCtxState

  setContext("parent", {
    get parent() {
      return group
    },
  })

  onMount(() => {
    parent.add(group)

    return function onDestroy() {
      parent.remove(group)
    }
  })
</script>

<slot />
