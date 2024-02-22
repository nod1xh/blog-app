const moment = require("moment");
const currentDate = moment().format("DD-MM-YYYY");

const data = [
  {
    _id: 1,
    title: "Building Your Dream Gaming PC: A Step-by-Step Guide",
    image: {
      src: "pc.jpg",
    },
    content: "Content of blog post one..",
    author: "Jane Doe",
    date: currentDate,
  },
  {
    _id: 2,
    title: "The Evolution of PC Gaming: From Pixels to Ray Tracing",
    image: {
      src: "eogaming.jpg",
    },
    content: "Content of blog post two..",
    author: "Anna Doe",
    date: currentDate,
  },
  {
    _id: 3,
    title: "Behind the Screens: Exploring the World of PC Gaming Accessories",
    image: {
      src: "gamingaccessories.jpg",
    },
    content: "Content of blog post three..",
    author: "John Doe",
    date: currentDate,
  },
];

module.exports = data;
