import { Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import "./css/login.css";
import "./css/signUp.css";
import "./css/messageboard.css";
import "./css/search.css";
import MessageBoard from "./pages/messageBoard";
import NewMessageForm from "./Components/newMessageForm";
import NewCategories from "./Components/newCategoriesForm";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import SearchByCategory from "./pages/categorysearch";

export default function App() {
  const { username } = useParams(); // Make sure this is done correctly, directly after import

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, [username]);
  return (
    <>
      <h1 className="complogo">Welcome to message board</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/messageBoard/:username" element={<MessageBoard />}>
          <Route path="newmessage" element={<NewMessageForm />} />
          <Route path="newcategories" element={<NewCategories />} />
          <Route path="searchByCategory" element={<SearchByCategory />} />
        </Route>
      </Routes>
    </>
  );
}
