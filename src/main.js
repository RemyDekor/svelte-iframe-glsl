import App from "./App.svelte"

const simulateFetchedData = new Promise((resolve, reject) => {
  setTimeout(() => {
    const sucessfulFetch = Math.random() > 0.08
    console.log("simulate fetch")
    if (sucessfulFetch) {
      resolve({
        data: {
          relevantNumbers: Array(Math.floor(3 + Math.random() * 5))
            .fill(undefined)
            .map(() => Math.random()),
          relevantText: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis officiis distinctio porro placeat voluptas? Voluptatibus quisquam dolorum tempora, animi facilis harum. Similique dicta, illum harum tempora sapiente atque quae? Consequatur.
          Rerum saepe beatae enim accusamus fugiat optio ipsam ratione. Voluptatem delectus nobis vero nesciunt eum tempora sequi minus aperiam ab quo voluptas aliquid, voluptatibus asperiores repellendus quia accusantium autem magni?
          Expedita voluptates accusamus facilis tempora recusandae eius nobis sit nemo assumenda, maiores molestiae quos inventore. Ex, incidunt velit voluptas omnis maxime placeat. Deleniti expedita reprehenderit voluptates dolore alias esse cum.
          Eligendi quia ipsa, dolorem quibusdam vel enim saepe perferendis neque doloribus cumque nostrum veniam id eius non fugiat dolores minima laboriosam quisquam consectetur aut eum culpa labore. Minima, unde corrupti.`,
        },
      })
    } else {
      reject()
    }
  }, 700)
})

const app = new App({
  target: document.body,
  props: {
    dataPromise: simulateFetchedData,
  },
})

export default app
