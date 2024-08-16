import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import thumb from "../assets/img/thumb_up_16_pink.png";
export default function MessageBoard() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  async function getMessages() {
    const response = await fetch("http://localhost:8080/messages");
    const data = await response.json();
    setMessages(data);
  }

  return (
    <div className="mbPage">
      <nav className="mbNav">
        <Link to={"/"}>Log Out</Link>
        <Link to={"/messageBoard/:username"}>MessageBoard</Link>
        <Link to="newmessage">New Message</Link>
        <Link to="newcategories">Create a new categorie</Link>
        <Link to="/searchByCategory/:username">Search</Link>
        <div className="mbHeadCont">
          <h1 className="mbHead">Messages Board</h1>
        </div>
      </nav>
      <div className="mbdiv">
        <Outlet />
        {messages.map(function (message) {
          const jsonDate = new Date(message.timestamp);
          const formattedDate = jsonDate.toLocaleDateString();
          const formattedTime = jsonDate.toLocaleTimeString();
          return (
            <div className="messageBox" key={message.id}>
              <div
                className="messageBoxHeader"
                style={{ backgroundColor: message.colour }}
              >
                <p className="user"> {message.user} </p>
                <h4 className="category"> Category: {message.category} </h4>
              </div>
              <div className="messageTextBox">
                <p className="message"> {message.message} </p>
              </div>
              <div
                className="messageBoxFooter"
                style={{ backgroundColor: message.colour }}
              >
                <div className="thumbContainer">
                  <img className="thumb" src={thumb} alt="pink thums up" />
                  <p className="likes"> {message.likes} </p>
                </div>
                <p className="timeStamp">
                  {" "}
                  Posted: {formattedDate} at {formattedTime}{" "}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
