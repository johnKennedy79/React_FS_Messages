import { Routes, Route } from "react-router-dom";
import "./App.css";
import MessageBoard from "./pages/messageBoard";
import NewMessageForm from "./Components/newMessageForm";
import NewCategories from "./Components/newCategoriesForm";
import Login from "./pages/login";
import SignUp from "./pages/signUp";

export default function App() {
  return (
    <>
      <h1>Welcome to message board</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/messageBoard/:username" element={<MessageBoard />}>
          <Route path="newmessage" element={<NewMessageForm />} />
          <Route path="newcategories" element={<NewCategories />} />
        </Route>
      </Routes>
    </>
  );
}
