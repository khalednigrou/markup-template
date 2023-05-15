const routes = [
    {
        dist: "index", // dist/index.html
        src: "src/views/pages/home/index.pug",
        meta: { title: "Home" }
    },
    {
        dist: "about/index", // dist/about.html
        src: "src/views/pages/about/index.pug",
        meta: { title: "About" }
    },
    {
        dist: "contact/index", // contact/index.html
        src: "src/views/pages/contact/index.pug",
        meta: { title: "Contact" },
    }
]

const render = {}

routes.map((route) => {
    const json = JSON.stringify({meta: route.meta, data: route.data})
    render[route.dist] = `${route.src}?json=${json}`
})

console.log("routes:",render)

module.exports = render