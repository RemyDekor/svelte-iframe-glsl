import * as THREE from "three"

// @ts-ignore
import fragShader from "../../shaders/basic.frag"
// @ts-ignore
import vertShader from "../../shaders/basic.vert"

/** @type {EntityFactory} */
const RotatingCubeFactory = (props) => {
  const geo = new THREE.BoxBufferGeometry(1, 1, 1)
  const mat = new THREE.ShaderMaterial({
    vertexShader: vertShader,
    fragmentShader: fragShader,
  })
  const mesh = new THREE.Mesh(geo, mat)

  function update(t) {
    mesh.rotation.y = t * 0.27
  }

  function destroy() {
    geo.dispose()
    mat.dispose()
  }

  return {
    ref: mesh,
    update,
    destroy,
  }
}

export default RotatingCubeFactory
