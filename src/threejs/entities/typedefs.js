/**
 * @typedef Entity
 * @property {THREE.Object3D} ref // Maybe could be {any} ?
 * @property {function} update
 * @property {function} [onWindowResize]
 * @property {function} destroy
 */

/**
 * @callback EntityFactory
 * @param {Object} [props]
 * @param {Array<string, Entity>} [props.children]
 * @returns {Entity}
 */

/**
 * @typedef SceneManager
 * @property {function} update
 * @property {function} [onWindowResize]
 * @property {function} destroy
 */

/**
 * @callback SceneManagerFactory
 * @param {HTMLCanvasElement} canvas canvas on wich to render
 * @param {Object} [props]
 * @param {Array<string, Entity>} [props.children]
 * @returns {SceneManager}
 */
