<script context="module">
  const barStyles = {
    maxHeight: 0.8,
    width: 0.3,
    spacing: 0.5,
  }
</script>

<script>
  // Instance script, executed for each component call
  import Cube from "./Cube.svelte"
  import { spring } from "svelte/motion"

  export let value
  export let index
  export let arrayLength

  $: barHeight.set(value * barStyles.maxHeight)

  const barHeight = spring(value * barStyles.maxHeight, {
    stiffness: 0.1,
    damping: 0.25,
  })

  $: position = [
    index * barStyles.spacing - ((arrayLength - 1) * barStyles.spacing) / 2,
    ($barHeight - barStyles.maxHeight) / 2,
    0,
  ]
</script>

<Cube {position} scale={[barStyles.width, $barHeight, barStyles.width * 0.4]} />
<slot />
