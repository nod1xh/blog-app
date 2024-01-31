import { createContext, useState, useEffect } from "react";

export interface PostData {
  id: number;
  title: string;
  author: string;
  image: {
    src: string;
  };
  date: string;
}

interface ContextType {
  featuredPosts: PostData[];
}

export const FeaturedPostsContext = createContext<ContextType>({
  featuredPosts: [],
});

const FeaturedPostsContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [featuredPosts, setFeaturedPosts] = useState<PostData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000");
        const resData = await response.json();
        setFeaturedPosts(resData.data);
        console.log(resData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const ctxValue = {
    featuredPosts,
    setFeaturedPosts,
  };

  return (
    <FeaturedPostsContext.Provider value={ctxValue}>
      {props.children}
    </FeaturedPostsContext.Provider>
  );
};

export default FeaturedPostsContextProvider;
