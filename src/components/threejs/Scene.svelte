<script lang="ts">
  import * as THREE from "three"
  import { onMount, setContext, getContext } from "svelte"

  const scene = new THREE.Scene()

  const canvasCtxState = getContext("canvas")
  const { activeScene } = canvasCtxState

  export let isActive = true
  $: if (isActive) activeScene.set(scene)

  const sceneCtxState = {
    get parent() {
      return scene
    },
  }

  setContext("parent", sceneCtxState)

  onMount(() => {
    //
    return function destroy() {
      console.log("dispose of scene")
      scene.dispose()
    }
  })
</script>

<slot />
