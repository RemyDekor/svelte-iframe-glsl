<script context="module">
  // Abstraction(module) script, executed only once,
  // even if the component is called several times.
  // can NOT receive props in this part of the component
  // can export variables to other files
  const geo = new THREE.BoxBufferGeometry(1, 1, 1)
  const mat = new THREE.ShaderMaterial({
    vertexShader: vertShader,
    fragmentShader: fragShader,
  })
</script>

<script>
  // Instance script, executed for each component call
  import { onMount } from "svelte"
  import * as THREE from "three"
  import { getContext } from "svelte"
  import { canvasCtxKey } from "./Canvas.svelte"
  // @ts-ignore
  import fragShader from "../../shaders/basic.frag"
  // @ts-ignore
  import vertShader from "../../shaders/basic.vert"

  export let position = [0, 0, 0]
  export let scale = [0, 0, 0]

  const mesh = new THREE.Mesh(geo, mat)
  $: mesh.position.set(...position)
  $: mesh.scale.set(...scale)

  const canvasCtxState = getContext(canvasCtxKey)
  $: ({ scene } = $canvasCtxState)

  function destroy() {
    scene.remove(mesh)
    geo.dispose()
    mat.dispose()
  }

  onMount(() => {
    scene.add(mesh)

    return destroy
  })
</script>

<slot />
