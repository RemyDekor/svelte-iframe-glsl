<script lang="ts">
  import * as THREE from "three"
  import Canvas from "./threejs/commons/Canvas.svelte"
  import Camera from "./threejs/commons/Camera.svelte"
  import Scene from "./threejs/commons/Scene.svelte"
  import ChartBar from "./threejs/ChartBar.svelte"
  import { onMount } from "svelte/internal"
  // @ts-ignore
  import fragShader from "../shaders/basic.frag"
  // @ts-ignore
  import vertShader from "../shaders/basic.vert"
  import type App from "../App.svelte"

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
      console.log("dispose of geometries and materials")
      myGeometry.dispose()
      myMaterial.dispose()
    }
  })

  // playground code below
  const camIds = ["cam0", "cam1", "cam2"]
  let activeCamIndex = 2
  const sceneIds = ["scene0", "scene1"]
  let activeSceneIndex = 0

  // let cubeElementRef, pyramidElementRef

  const clock = new THREE.Clock()
  let elapsedTime = 0
  let rafID = null
  let isPaused = false
  const loop = () => {
    rafID = requestAnimationFrame(loop)
    elapsedTime = clock.getElapsedTime()
  }

  $: if (isPaused) cancelAnimationFrame(rafID)
  $: if (!isPaused) loop()

  setInterval(() => {
    console.log(camIds[activeCamIndex])
    activeCamIndex = (activeCamIndex + 1) % camIds.length
    activeSceneIndex = (activeSceneIndex + 1) % sceneIds.length
    isPaused = activeCamIndex === 2
  }, 3200)
</script>

<Canvas>
  <!-- <Camera
    key={camIds[0]}
    position={[Math.sin(elapsedTime * 1.4), 1 + Math.cos(elapsedTime * 1.4) * 0.5, 2]} /> -->
  <!-- <Camera
    key={camIds[1]}
    isUpdatingLookAt={true}
    position={[2 + Math.cos(elapsedTime * 1.3), 1, 0.2 + Math.sin(elapsedTime)]} /> -->
  <Camera key={camIds[2]} />

  <Scene>
    {#each chartBars as value, index}
      <ChartBar
        {value}
        material={myMaterial}
        geometry={myGeometry}
        {index}
        arrayLength={chartBars.length} />
    {/each}
  </Scene>
</Canvas>
