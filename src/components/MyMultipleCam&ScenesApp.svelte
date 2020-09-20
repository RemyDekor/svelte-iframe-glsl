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

<Canvas
  activeCamKey={camIds[activeCamIndex]}
  activeSceneKey={sceneIds[activeSceneIndex]}>
  <Camera
    key={camIds[0]}
    position={[Math.sin(elapsedTime * 1.4), 1 + Math.cos(elapsedTime * 1.4) * 0.5, 2]} />
  <Camera
    key={camIds[1]}
    isUpdatingLookAt={true}
    position={[2 + Math.cos(elapsedTime * 1.3), 1, 0.2 + Math.sin(elapsedTime)]} />
  <Camera key={camIds[2]} />
  <!-- <Scene elem={cubeElementRef}> -->
  <Scene key={sceneIds[0]}>
    <ChartBar
      value={1.5}
      material={myMaterial}
      geometry={myGeometry}
      index={1}
      arrayLength={1} />
  </Scene>
  <!-- <Scene elem={pyramidElementRef}> -->
  <Scene key={sceneIds[1]}>
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

<!-- <p>
  <span bind:this={cubeElementRef} class="diagram left" />
  I love boxes. Presents come in boxes. When I find a new box I'm always excited to
  find out what's inside.
</p>
<p>
  <span bind:this={pyramidElementRef} class="diagram right" />
  When I was a kid I dreamed of going on an expedition inside a pyramid and finding a
  undiscovered tomb full of mummies and treasure.
</p><style>
  #c {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: block;
    z-index: -1;
  }
  .diagram {
    display: inline-block;
    width: 5em;
    height: 3em;
  }
  .left {
    float: left;
    margin-right: 0.25em;
  }
  .right {
    float: right;
    margin-left: 0.25em;
  }
  p {
    margin: 1em auto;
    max-width: 500px;
    font-size: xx-large;
  }
</style> -->
