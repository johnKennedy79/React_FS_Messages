import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import thumb from "../assets/img/thumb_up_16_pink.png";

export default function MessageBoard() {
  const { username } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  async function getMessages() {
    try {
      const response = await fetch("http://localhost:8080/messages");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  }
  //send likes
  async function sendLike(messageId) {
    const reslike = await fetch(
      `http://localhost:8080/messages/${messageId}/like`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
      }
    );
    if (reslike.ok) {
      location.reload();
    } else {
      console.error("failed to add like");
    }
  }
  // delete message
  async function deleteMessage(messageId) {
    const resdelete = await fetch(
      `http://localhost:8080/messages/${messageId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
      }
    );
    if (resdelete.ok) {
      location.reload();
    } else {
      console.error("failed to DELETE");
    }
  }
  return (
    <div className="mbPage">
      <nav className="mbNav">
        <Link to={"/"}>Log Out</Link>
        <Link to={`/messageBoard/${username}`}>MessageBoard</Link>
        <Link to="newmessage">New Message</Link>
        <Link to="newcategories">Create a new categorie</Link>
        <Link to="searchByCategory">Search</Link>
      </nav>
      <div className="mbHeadCont">
        <h1 className="mbHead">Messages Board</h1>
      </div>
      <div className="mbdiv">
        <Outlet />
        {messages.map((message) => {
          const jsonDate = new Date(message.timestamp);
          const formattedDate = jsonDate.toLocaleDateString();
          const formattedTime = jsonDate.toLocaleTimeString();

          return (
            <div className="messageBox" key={message.id}>
              <div
                className="messageBoxHeader"
                style={{ backgroundColor: message.colour }}
              >
                <p className="user">{message.user}</p>
                <h4 className="category">Category: {message.category}</h4>
              </div>
              <div className="messageTextBox">
                <p>{message.message}</p>
                <button
                  onClick={() => deleteMessage(message.id)}
                  className="delete"
                >
                  delete
                </button>
              </div>
              <div
                className="messageBoxFooter"
                style={{ backgroundColor: message.colour }}
              >
                <div
                  className="thumbContainer"
                  onClick={() => sendLike(message.id)}
                >
                  <img className="thumb" src={thumb} alt="thumbs up" />
                  <p className="likes">{message.likes}</p>
                </div>
                <p className="timeStamp">
                  Posted: {formattedDate} at{formattedTime}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
