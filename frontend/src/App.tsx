import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllPosts from "./pages/AllPosts";
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import CreatePost from "./pages/CreatePost";

import SignUp from "./pages/SignUp";
import Post from "./pages/FeaturedPost";
import UserPost from "./pages/UserCreatedPost";

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
      { path: "signup", element: <SignUp /> },
      { path: "/:postId", element: <Post /> },
      { path: "allPosts/:postId", element: <UserPost /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
