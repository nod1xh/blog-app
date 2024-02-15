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
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleLogout: () => void;
}

export const PostsContext = createContext<ContextType>({
  allPosts: [],
  featuredPosts: [],
  user: { username: "", email: "", password: "" },
  setAllPosts: () => {},
  setUser: () => {},
  isLogged: false,
  handleSignUp: async () => {},
  handleLogout: () => {},
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchAllPosts();
    fetchFeaturedPosts();
  }, []);

  async function handleSignUp(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/signup", user);
      const data = response.data;

      if (data.success) {
        localStorage.setItem("token", data.token);
      }
      setIsLogged(true);
    } catch (error) {
      console.error("Error signing up", error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLogged(true);
    }
  }, []);

  function handleLogout() {
    setIsLogged(false);
    localStorage.removeItem("token");
    setUser({
      username: "",
      email: "",
      password: "",
    });
  }

  const ctxValue = {
    allPosts,
    setAllPosts,
    featuredPosts,
    user,
    setUser,
    isLogged,
    handleSignUp,
    handleLogout,
  };

  return (
    <PostsContext.Provider value={ctxValue}>
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsContextProvider;
