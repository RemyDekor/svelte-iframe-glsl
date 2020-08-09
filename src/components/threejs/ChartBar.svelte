<script lang="ts">
  // Instance script, executed for each component call

  import Mesh from "./Mesh.svelte"
  import { spring } from "svelte/motion"

  export let value
  export let index
  export let arrayLength
  export let geometry
  export let material

  // barStyles could be a prop
  const barStyles = {
    maxHeight: 0.8,
    spacing: 0.4,
    width: 0.28,
  }

  const dotStyles = {
    width: 0.5,
  }

  $: barHeight.set(value * barStyles.maxHeight)

  const barHeight = spring(value * barStyles.maxHeight, {
    stiffness: 0.1,
    damping: 0.25,
  })

  let position
  $: position = [
    index * barStyles.spacing - ((arrayLength - 1) * barStyles.spacing) / 2,
    ($barHeight - barStyles.maxHeight) / 2,
    0,
  ]
</script>

<Mesh
  {geometry}
  {material}
  {position}
  scale={[barStyles.width, $barHeight, barStyles.width * 0.4]}>
  <Mesh
    {geometry}
    {material}
    position={[0, $barHeight * 0.5 + dotStyles.width, 0]}
    scale={[dotStyles.width, dotStyles.width / ($barHeight * 2), dotStyles.width]} />
</Mesh>
<slot />
