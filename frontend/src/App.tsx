import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllPosts from "./pages/AllPosts";
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import CreatePost from "./pages/CreatePost";

import SignUp from "./pages/SignUp";
import Post from "./pages/FeaturedPost";
import UserPost from "./pages/UserCreatedPost";
import LogIn from "./pages/LogIn";

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
      { path: "/:postId", element: <Post /> },
      { path: "allPosts/:postId", element: <UserPost /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <LogIn /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
