import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllPosts from "./pages/AllPosts";
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import CreatePost from "./pages/CreatePost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement:
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "allposts", element: <AllPosts /> },
      { path: "createpost", element: <CreatePost /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
