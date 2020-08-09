<script lang="ts">
  import * as THREE from "three"
  import Canvas from "./threejs/Canvas.svelte"
  import ChartBar from "./threejs/Mesh.svelte"
  import { each, onMount } from "svelte/internal"

  // @ts-ignore
  import fragShader from "../shaders/basic.frag"
  // @ts-ignore
  import vertShader from "../shaders/basic.vert"

  export let data

  // check if D3 or other lib (ramda, lodash?) could be usefull here, for data transforms
  const doSomeNeatTransforms = (data) => {
    return data.relevantNumbers.sort().reverse()
  }

  let chartBars = doSomeNeatTransforms(data)

  const myGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
  const myMaterial = new THREE.ShaderMaterial({
    vertexShader: vertShader,
    fragmentShader: fragShader,
  })

  onMount(() => {
    // on mount stuff
    return function destroy() {
      myGeometry.dispose()
      myMaterial.dispose()
    }
  })
</script>

<Canvas>
  {#each chartBars as chartBar, index}
    <ChartBar
      material={myMaterial}
      geometry={myGeometry}
      position={[index * 0.5 - (chartBars.length - 1) * 0.25, 0, 0]}
      scale={[0.3, chartBar * 0.8, 0.3]}
      rotation={[0, 0.2, 0]} />
  {/each}
</Canvas>
