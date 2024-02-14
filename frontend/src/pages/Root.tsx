import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import PostsContextProvider from "../context/posts-context";

export default function RootLayout() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <main>
        <PostsContextProvider>
          <Outlet />
        </PostsContextProvider>
      </main>
    </div>
  );
}
