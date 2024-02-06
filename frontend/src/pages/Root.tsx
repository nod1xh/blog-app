import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import FeaturedPostsContextProvider from "../context/featuredposts-context";
import AllPostsContextProvider from "../context/allposts-context";

export default function RootLayout() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <main>
        <FeaturedPostsContextProvider>
          <AllPostsContextProvider>
            <Outlet />
          </AllPostsContextProvider>
        </FeaturedPostsContextProvider>
      </main>
    </div>
  );
}
