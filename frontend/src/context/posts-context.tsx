import axios, { AxiosError } from "axios";
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
  userId: string;
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
  getToken: () => string;
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
  getToken: () => localStorage.getItem("token")!,
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
        console.log(response.data.data);
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
      const err = error as AxiosError<{ message: string }>;
      const errMsg = err.response!.data.message;

      if (err.response && err.response.status === 400) {
        console.error(errMsg);
      } else if (err.response && err.response.status === 401) {
        console.error(errMsg);
      } else if (err.response && err.response.status === 500) {
        console.error(errMsg);
      }
    }
  }

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
      console.log(userLogin);

      if (data.success) {
        localStorage.setItem("token", data.token);
        setIsLogged(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
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

  function getToken() {
    return localStorage.getItem("token")!;
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
    getToken,
  };

  return (
    <PostsContext.Provider value={ctxValue}>
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsContextProvider;
