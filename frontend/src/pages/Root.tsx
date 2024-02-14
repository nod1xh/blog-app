import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import PostsContextProvider from "../context/posts-context";

export default function RootLayout() {
  return (
    <div className="container mx-auto">
      <PostsContextProvider>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </PostsContextProvider>
    </div>
  );
}
