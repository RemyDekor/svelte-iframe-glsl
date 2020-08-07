import App from "./App.svelte"

const initialProps = { color: "tomato" }

const app = new App({
  target: document.body,
  props: initialProps,
})

export default app
