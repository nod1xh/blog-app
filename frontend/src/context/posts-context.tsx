import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface PostData {
  _id: string | number;
  title: string;
  author: string;
  image: {
    src: string;
    contentType?: string;
  };
  date: string;
}

interface User {
  username: string;
  email: string;
  password: string;
}

interface ContextType {
  allPosts: PostData[];
  featuredPosts: PostData[];
  setAllPosts: Dispatch<SetStateAction<PostData[]>>;
  setUser: Dispatch<SetStateAction<User>>;
  user: User;
  isLogged: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const PostsContext = createContext<ContextType>({
  allPosts: [],
  featuredPosts: [],
  user: { username: "", email: "", password: "" },
  setAllPosts: () => {},
  setUser: () => {},
  isLogged: false,
  handleSubmit: async () => {},
});

const PostsContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [allPosts, setAllPosts] = useState<PostData[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<PostData[]>([]);
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const response = await axios.get("http://localhost:5000/allposts");
        setAllPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching all posts", error);
      }
    }

    async function fetchFeaturedPosts() {
      try {
        const response = await axios.get("http://localhost:5000");
        setFeaturedPosts(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchAllPosts();
    fetchFeaturedPosts();
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/signup", user);
      setIsLogged(response.data.success);
      console.log(response.data);
    } catch (error) {
      console.error("Error signing up", error);
    }
  }

  const ctxValue = {
    allPosts,
    setAllPosts,
    featuredPosts,
    user,
    setUser,
    isLogged,
    handleSubmit,
  };

  return (
    <PostsContext.Provider value={ctxValue}>
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsContextProvider;
