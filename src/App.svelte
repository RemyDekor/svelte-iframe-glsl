<script lang="ts">
  import { fade } from "svelte/transition"
  import * as frames from "@newswire/frames" // for iframe sizing etc

  import Loader from "./components/Loader.svelte"
  // import DataVisualization from "./components/DataVisualization.svelte"

  import MyThreeJsApp from "./components/ReactiveThreeJSDataviz.svelte"

  // props
  export let color

  const simulateFetchData = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const sucessfulFetch = Math.random() > 0.08
        console.log("simulate fetch")
        if (sucessfulFetch) {
          resolve({
            data: {
              relevantNumbers: Array(5)
                .fill(undefined)
                .map(() => Math.random()),
              lastUpdated: Date.now(),
              relevantText: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis officiis distinctio porro placeat voluptas? Voluptatibus quisquam dolorum tempora, animi facilis harum. Similique dicta, illum harum tempora sapiente atque quae? Consequatur.
          Rerum saepe beatae enim accusamus fugiat optio ipsam ratione. Ex, incidunt velit voluptas omnis maxime placeat. Deleniti expedita reprehenderit voluptates dolore alias esse cum.
          Eligendi quia ipsa, dolorem quibusdam vel enim saepe perferendis neque doloribus cumque nostrum veniam id eius non fugiat dolores minima laboriosam quisquam consectetur aut eum culpa labore. Minima, unde corrupti.`,
            },
          })
        } else {
          reject("simulated fetch error")
        }
      }, 600)
    })

  let fetchedData = simulateFetchData()

  setInterval(() => {
    simulateFetchData().then((res) => {
      fetchedData = res
    })
  }, 1800)

  // 1. Sends the initial frame's content height
  // 2. Sets up an one-time istener to send the height on load
  // 3. Sets up a listener to send the height every time the frame resizes
  frames.initFrame()
  simulateFetchData().then(frames.sendFrameHeight)
</script>

<wrapper>
  {#await fetchedData}
    <Loader />
  {:then response}
    <MyThreeJsApp data={response.data} {color} />
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
