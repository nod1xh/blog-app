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

interface UserLogin {
  username: string;
  password: string;
}

interface ContextType {
  allPosts: PostData[];
  featuredPosts: PostData[];
  setAllPosts: Dispatch<SetStateAction<PostData[]>>;
  setUser: Dispatch<SetStateAction<User>>;
  setUserLogin: Dispatch<SetStateAction<UserLogin>>;
  user: User;
  userLogin: UserLogin;
  isLogged: boolean;
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleLogIn: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleLogout: () => void;
}

export const PostsContext = createContext<ContextType>({
  allPosts: [],
  featuredPosts: [],
  user: { username: "", email: "", password: "" },
  userLogin: { username: "", password: "" },
  setAllPosts: () => {},
  setUser: () => {},
  setUserLogin: () => {},
  isLogged: false,
  handleSignUp: async () => {},
  handleLogout: () => {},
  handleLogIn: async () => {},
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
  const [userLogin, setUserLogin] = useState<UserLogin>({
    username: "",
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

  async function handleLogIn(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        userLogin
      );
      const data = response.data;

      if (data.success) {
        setIsLogged(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

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
    userLogin,
    setUserLogin,
    isLogged,
    handleSignUp,
    handleLogout,
    handleLogIn,
  };

  return (
    <PostsContext.Provider value={ctxValue}>
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsContextProvider;
