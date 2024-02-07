import axios from "axios";
import { createContext, useEffect, useState } from "react";

export interface PostData {
  _id: string;
  title: string;
  author: string;
  image: {
    src: string;
    contentType: string;
  };
  date: string;
}

interface ctxType {
  allPosts: PostData[];
}

export const AllPostsContext = createContext<ctxType>({
  allPosts: [],
});

const AllPostsContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [allPosts, setAllPosts] = useState<PostData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/allposts");
        setAllPosts(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching all posts", error);
      }
    }

    fetchData();
  }, []);

  const ctxValue = {
    allPosts,
  };

  return (
    <AllPostsContext.Provider value={ctxValue}>
      {props.children}
    </AllPostsContext.Provider>
  );
};

export default AllPostsContextProvider;
