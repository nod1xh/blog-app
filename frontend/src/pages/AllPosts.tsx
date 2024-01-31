import { NavLink } from "react-router-dom";

const data = [
  {
    id: 1,
    title: "Building Your Dream Gaming PC: A Step-by-Step Guide",
    image: {
      src: "pc.jpg",
    },
    content: "Content of blog post one..",
    author: "Dino Hodzic",
    date: new Date().toISOString().slice(0, 10), // Zamijeniti sa funkcijom koja generise novi datum kada se doda post.
  },
  {
    id: 2,
    title: "The Evolution of PC Gaming: From Pixels to Ray Tracing",
    image: {
      src: "eogaming.jpg",
    },
    content: "Content of blog post two..",
    author: "Elmedin Hodzic",
    date: new Date().toISOString().slice(0, 10), // Zamijeniti sa funkcijom koja generise novi datum kada se doda post.
  },
  {
    id: 3,
    title: "Behind the Screens: Exploring the World of PC Gaming Accessories",
    image: {
      src: "gamingaccessories.jpg",
    },
    content: "Content of blog post three..",
    author: "John Doe",
    date: new Date().toISOString().slice(0, 10), // Zamijeniti sa funkcijom koja generise novi datum kada se doda post.
  },
];

export default function AllPosts() {
  return (
    <>
      <div className="font-semibold text-2xl text-center mt-10">
        <h1>All Posts</h1>
      </div>
      <div className="flex justify-between items-center mt-10">
        {data.map((data) => (
          <div className="border-2 border-black p-2 mb-10 w-1/4" key={data.id}>
            <div className="flex justify-center">
              <img src={data.image.src} alt="img" className="h-72" />
            </div>
            <h1 className="font-medium">{data.title}</h1>
            <p>Author: {data.author}</p>
            <p>Date: {data.date}</p>
            <div className="flex items-center mt-2">
              <NavLink
                className="hover:bg-transparent"
                to={`/allposts/${data.id}`}
              >
                View Post
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
