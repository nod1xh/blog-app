// const eogaming = require("../assets/images/eogaming.jpg");
// const gaccessories = require("../assets/images/gamingaccessories.jpg");
// const pc = require("../assets/images/pc.jpg");

const data = [
  {
    _id: 1,
    title: "Building Your Dream Gaming PC: A Step-by-Step Guide",
    image: {
      src: "pc.jpg",
    },
    content: "Content of blog post one..",
    author: "Dino Hodzic",
    date: new Date().toISOString().slice(0, 10), // Zamijeniti sa funkcijom koja generise novi datum kada se doda post.
  },
  {
    _id: 2,
    title: "The Evolution of PC Gaming: From Pixels to Ray Tracing",
    image: {
      src: "eogaming.jpg",
    },
    content: "Content of blog post two..",
    author: "Elmedin Hodzic",
    date: new Date().toISOString().slice(0, 10), // Zamijeniti sa funkcijom koja generise novi datum kada se doda post.
  },
  {
    _id: 3,
    title: "Behind the Screens: Exploring the World of PC Gaming Accessories",
    image: {
      src: "gamingaccessories.jpg",
    },
    content: "Content of blog post three..",
    author: "John Doe",
    date: new Date().toISOString().slice(0, 10), // Zamijeniti sa funkcijom koja generise novi datum kada se doda post.
  },
];

module.exports = data;
