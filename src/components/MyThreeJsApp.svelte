<script>
  import Canvas from "./threejs/Canvas.svelte"
  import ChartBar from "./threejs/ChartBar.svelte"
  import { each } from "svelte/internal"

  export let data

  // check if D3 or other lib (ramda, lodash?) could be usefull here, for data transforms
  const doSomeNeatTransforms = (data) => {
    return data.relevantNumbers.sort().reverse()
  }

  let chartBars = doSomeNeatTransforms(data)
</script>

<Canvas>
  {#each chartBars as chartBar, index}
    <ChartBar
      position={[index * 0.5 - (chartBars.length - 1) * 0.25, 0, 0]}
      scale={[0.3, chartBar * 0.8, 0.3]} />
  {/each}
</Canvas>
