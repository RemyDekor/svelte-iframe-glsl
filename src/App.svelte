<script>
  import { fade } from "svelte/transition"
  import * as frames from "@newswire/frames" // for iframe sizing etc

  import Loader from "./components/Loader.svelte"
  import DataVisualization from "./components/DataVisualization.svelte"

  // props
  export let dataPromise

  // 1. Sends the initial frame's content height
  // 2. Sets up an one-time istener to send the height on load
  // 3. Sets up a listener to send the height every time the frame resizes
  frames.initFrame()
  dataPromise.then(frames.sendFrameHeight)
</script>

<wrapper>
  {#await dataPromise}
    <Loader />
  {:then response}
    <DataVisualization data={response} />
  {:catch error}
    <p class="error">could not fetch data</p>
  {/await}
</wrapper>

<style>
  :root {
    min-height: min-content;
    background: white;
  }
  :global(body) {
    height: 100%;
    min-height: 100%;
    margin: 15px;
  }
  .error {
    color: red;
  }
</style>
