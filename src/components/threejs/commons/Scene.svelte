<script lang="ts">
  import * as THREE from "three"
  import { onMount, afterUpdate, setContext, getContext } from "svelte"

  const scene = new THREE.Scene()

  const canvasCtxState = getContext("canvas")
  const { rendererNeedsUpdate, scenes, activeScene } = canvasCtxState

  export let elem = null
  $: if (elem) console.log(elem)

  export let isActive = true
  $: if (isActive) activeScene.set(scene)

  export let key: string = ""
  $: {
    scene.key = key
    scenes.add(scene)
  }

  // ask for re-render when scene is updated (&& if is activeScene)
  afterUpdate(() => {
    if ($activeScene.key === scene.key) rendererNeedsUpdate.set(true)
  })

  const sceneCtxState = {
    get parent() {
      return scene
    },
  }

  setContext("parent", sceneCtxState)

  onMount(() => {
    //
    return function destroy() {
      scenes.remove(scene.key)
      console.log("dispose of scene")
      scene.dispose()
    }
  })
</script>

<slot />
