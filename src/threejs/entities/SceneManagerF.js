import * as THREE from "three"
import { filterMap } from "../../utils"

/** @type SceneManagerFactory */
const SceneManagerFactory = (canvas, props) => {
  let { children = [] } = props

  const origin = new THREE.Vector3()

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    // alpha: true,
  })

  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.001,
    500
  )
  camera.position.z = -3
  camera.lookAt(origin)

  const scene = new THREE.Scene()
  children.forEach(([key, entity]) => scene.add(entity.ref))

  /** @type {Array<string, Entity>} */
  const updatables = children.filter(
    ([key, entity]) => typeof entity.update === "function"
  )

  /** @type {number} */
  let rafID
  const clock = new THREE.Clock(true)

  function update() {
    rafID = requestAnimationFrame(update)
    const elapsedTime = clock.getElapsedTime()
    // console.log(props.children)
    updatables.forEach(([key, entity]) => entity.update(elapsedTime))
    renderer.render(scene, camera)
  }

  const onWindowResize = () => {
    const width = canvas.clientWidth
    const height = canvas.clientHeight

    renderer.setSize(width, height)

    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  function destroy() {
    window.removeEventListener("resize", onWindowResize)
    cancelAnimationFrame(rafID)
    children.forEach((entity) => {
      scene.remove(entity.ref)
      entity.destroy()
    })
    renderer.dispose()
    scene.dispose()
  }

  window.addEventListener("resize", onWindowResize)
  onWindowResize()
  update()

  return {
    update,
    onWindowResize,
    destroy,
  }
}

export default SceneManagerFactory
