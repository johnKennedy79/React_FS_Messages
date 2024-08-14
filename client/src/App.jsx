import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import MessageBoard from "./pages/messageBoard";
import NewMessageForm from "./Components/newMessageForm";
import Login from "./pages/login";
export default function App() {
  return (
    <>
      <Link to="/signup"> Sign Up</Link>
      <h1>Login to Message Board</h1>
      <Routes>
        <Route path="/" element={<Login />}>
          <Route path="/messages/:username" element={<MessageBoard />}></Route>
          <Route path="/newmessage" element={<NewMessageForm />} />
        </Route>
      </Routes>
    </>
  );
}
