import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
export default function MessageBoard() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  async function getMessages() {
    const response = await fetch("http://localhost:8080/messages");
    const data = await response.json();
    console.log(data);
    setMessages(data);
  }

  return (
    <>
      <Link to={"/"}>Home</Link>
      <Link to="newmessage">New Message</Link>
      <Link to="newcategories">Create a new categorie</Link>
      <div>
        <h1>Messages Board</h1>
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
              <div
                className="messageTextBox"
                style={{ backgroundColor: message.colour }}
              >
                <p className="message"> {message.message} </p>
              </div>
              <div
                className="messageBoxFooter"
                style={{ backgroundColor: message.colour }}
              >
                <p className="likes"> likes: {message.likes} </p>

                <p className="timeStamp">
                  {" "}
                  Posted: {formattedDate} at {formattedTime}{" "}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
