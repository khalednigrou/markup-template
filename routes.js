const routes = [
    {
        // dist/index.html
        dist: "index",
        src: "src/views/pages/home/index.pug",
        meta: {
            title: "Home"
        }
    },
    {
        // dist/about.html
        dist: "about/index",
        src: "src/views/pages/about/index.pug",
        meta: {
            title: "About"
        }
    },
    {
        // contact/index.html
        dist: "contact/index",
        src: "src/views/pages/contact/index.pug",
        meta: {
            title: "Contact"
        },
    }
];

let render = {};

routes.map((route) => {
    const json = JSON.stringify({meta: route.meta, data: route.data});
    render[route.dist] = `${route.src}?json=${json}`;
});

console.log("routes:",render)

module.exports = render