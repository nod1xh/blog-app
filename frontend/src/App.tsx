import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllPosts from "./pages/AllPosts";
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Post from "./pages/Post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    // errorElement:
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "allposts", element: <AllPosts /> },
      { path: "createpost", element: <CreatePost /> },
      { path: "login", element: <Login /> },
      { path: "allposts/:postId", element: <Post /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
