import * as THREE from "three"
import { filterMap } from "../utils"
import RotatingCube from "./RotatingCube"

const SceneManager = ({ canvas }) => {
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

  /** @type {Map<string, MeshEntity>} */
  const entities = new Map([
    ["rotatingCube", RotatingCube({ parent: scene })],
    // ...
  ])

  /** @type {Map<string, MeshEntity>} */
  const updatables = filterMap(
    entities,
    (value) => typeof value.update === "function"
  )

  /** @type {number} */
  let rafID
  const clock = new THREE.Clock(true)

  function mainUpdate() {
    rafID = requestAnimationFrame(mainUpdate)
    const elapsedTime = clock.getElapsedTime()
    updatables.forEach((updtbl) => updtbl.update(elapsedTime))
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
    entities.forEach((entity) => {
      entity.destroy()
    })
    renderer.dispose()
    scene.dispose()
  }

  window.addEventListener("resize", onWindowResize)
  onWindowResize()
  mainUpdate()

  return {
    onWindowResize,
    mainUpdate,
    destroy,
  }
}

export default SceneManager
