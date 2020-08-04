import * as THREE from "three"

// @ts-ignore
import fragShader from "../shaders/frag.glsl"

/**
 * @param {Object} args
 * @param {THREE.Object3D} args.parent - ex: Scene, Group
 * @returns {MeshEntity}
 */
const RotatingCube = ({ parent }) => {
  const geo = new THREE.BoxBufferGeometry(1, 1, 1)
  const mat = new THREE.ShaderMaterial({
    fragmentShader: fragShader,
  })
  const mesh = new THREE.Mesh(geo, mat)

  parent.add(mesh)

  function update(t) {
    mesh.rotation.y = t * 0.27
  }

  function destroy() {
    parent.remove(mesh)
    geo.dispose()
    mat.dispose()
  }

  return {
    meshRef: mesh,
    update,
    destroy,
  }
}

export default RotatingCube
