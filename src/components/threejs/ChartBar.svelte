<script lang="ts">
  // Instance script, executed for each component call

  import Mesh from "./commons/Mesh.svelte"
  import Group from "./commons/Group.svelte"
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
    width: 0.15,
  }

  $: barHeight.set(value * barStyles.maxHeight)

  const barHeight = spring(value * barStyles.maxHeight, {
    stiffness: 0.1,
    damping: 0.25,
  })

  let positionX, positionY
  $: positionX =
    index * barStyles.spacing - ((arrayLength - 1) * barStyles.spacing) / 2
  $: positionY = ($barHeight - barStyles.maxHeight) / 2
</script>

<Group position={[positionX, 0, 0]}>
  <Mesh
    {geometry}
    {material}
    position={[0, positionY, 0]}
    scale={[barStyles.width, $barHeight, barStyles.width * 0.4]} />
  <Mesh
    {geometry}
    {material}
    position={[0, $barHeight - (barStyles.maxHeight - dotStyles.width) * 0.5, 0]}
    scale={[dotStyles.width, dotStyles.width, dotStyles.width]} />
</Group>
<slot />
