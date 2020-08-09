<script lang="ts">
  import * as THREE from "three"
  import Canvas from "./threejs/Canvas.svelte"
  import ChartBar from "./threejs/ChartBar.svelte"
  import { onMount } from "svelte/internal"
  // @ts-ignore
  import fragShader from "../shaders/basic.frag"
  // @ts-ignore
  import vertShader from "../shaders/basic.vert"

  export let data

  // check if D3 or other lib (ramda, lodash?) could be usefull here, for data transforms etc
  const transformDataInASmartWay = (data) => {
    return data.relevantNumbers.sort()
  }

  $: chartBars = transformDataInASmartWay(data)

  const myGeometry = new THREE.SphereBufferGeometry(0.5, 14, 16)
  const myMaterial = new THREE.ShaderMaterial({
    vertexShader: vertShader,
    fragmentShader: fragShader,
  })

  onMount(() => {
    // on mount stuff, if DOM/canvas is needed
    return function destroy() {
      // on destroy stuff, to avoid memory leaks
      myGeometry.dispose()
      myMaterial.dispose()
    }
  })
</script>

<Canvas>
  {#each chartBars as value, index}
    <ChartBar
      {value}
      material={myMaterial}
      geometry={myGeometry}
      {index}
      arrayLength={chartBars.length} />
  {/each}
</Canvas>
