import { Framer } from "https://unpkg.com/@newswire/frames/dist/index.mjs" // for iframe sizing etc
const container = document.getElementById("embed-container")
const src = "http://localhost:5000/index.html"
// adds the iframe to the page and listens for height changes notifications from within the iframe
const framer = new Framer({ container, src })
