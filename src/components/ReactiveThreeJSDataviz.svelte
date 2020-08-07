<script>
  import Canvas from "./threejs/Canvas.svelte"
  import ChartBar from "./threejs/ChartBar.svelte"
  import { each } from "svelte/internal"

  export let data

  // check if D3 or other lib (ramda, lodash?) could be usefull here, for data transforms etc
  const sortDataInASmartWay = (data) => {
    return data.relevantNumbers.sort()
  }

  $: chartBars = sortDataInASmartWay(data)
</script>

<Canvas>
  {#each chartBars as value, index}
    <ChartBar {value} {index} arrayLength={chartBars.length} />
  {/each}
</Canvas>
