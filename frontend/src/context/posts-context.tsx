import axios, { AxiosError } from "axios";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../config/config";

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

interface Errors {
  username?: "string";
  email?: "string";
  password?: "string";
  general?: string;
}

interface ContextType {
  allPosts: PostData[];
  featuredPosts: PostData[];
  setAllPosts: Dispatch<SetStateAction<PostData[]>>;
  setUser: Dispatch<SetStateAction<User>>;
  setUserLogin: Dispatch<SetStateAction<UserLogin>>;
  setError: Dispatch<SetStateAction<Errors>>;
  setPostError: Dispatch<SetStateAction<string>>;
  setFetchError: Dispatch<SetStateAction<string>>;
  user: User;
  userLogin: UserLogin;
  isLogged: boolean;
  error: Errors;
  postError: string;
  fetchError: string;
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
  error: {},
  postError: "",
  fetchError: "",
  setAllPosts: () => {},
  setUser: () => {},
  setUserLogin: () => {},
  setError: () => {},
  setPostError: () => {},
  setFetchError: () => {},
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
  const [error, setError] = useState<Errors>({});
  const [postError, setPostError] = useState("");
  const [fetchError, setFetchError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const response = await axios.get(`${baseUrl}/allposts`);
        const createdPosts = response.data.data;
        setAllPosts(createdPosts);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        setFetchError(err.response?.data.message!);
      }
    }

    async function fetchFeaturedPosts() {
      try {
        const response = await axios.get(baseUrl);
        setFeaturedPosts(response.data.data);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        setFetchError(err.response?.data.message!);
      }
    }

    fetchFeaturedPosts();
    fetchAllPosts();
  }, [allPosts]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLogged(true);
    }
  }, []);

  async function handleSignUp(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/signup`, user);
      const data = response.data;

      if (data.success) {
        localStorage.setItem("token", data.token);
      }
      setIsLogged(true);
    } catch (error) {
      const err = error as AxiosError<{ message: string; field: string }>;

      if (err.response) {
        const { message, field } = err.response.data;
        if (field) {
          setError((prev) => ({ ...prev, [field]: message }));
        } else {
          setError((prev) => ({ ...prev, general: message }));
        }

        setTimeout(() => {
          if (field) {
            setError((prev) => ({ ...prev, [field]: "" }));
          } else {
            setError((prev) => ({ ...prev, general: "" }));
          }
        }, 3000);
      }
    }
  }

  async function handleLogIn(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/login`, userLogin);
      const data = response.data;

      if (data.success) {
        localStorage.setItem("token", data.token);
        setIsLogged(true);
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string; field: string }>;
      if (err.response) {
        const { message, field } = err.response.data;
        if (field) {
          setError((prev) => ({ ...prev, [field]: message }));
        } else {
          // If the error is not field-specific or field is not provided by the API
          setError((prev) => ({ ...prev, general: message }));
        }

        setTimeout(() => {
          if (field) {
            setError((prev) => ({ ...prev, [field]: "" }));
          } else {
            setError((prev) => ({ ...prev, general: "" }));
          }
        }, 2000);
      }
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
    navigate("/allposts");
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
    setError,
    error,
    fetchError,
    postError,
    setPostError,
    setFetchError,
  };

  return (
    <PostsContext.Provider value={ctxValue}>
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsContextProvider;
