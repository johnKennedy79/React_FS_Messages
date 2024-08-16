import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function SearchByCategory() {
  const [category, setCategory] = useState([]);
  const [messagesByCat, setMessagesByCat] = useState([]);
  const [form, setForm] = useState({
    category: "",
  });
  useEffect(() => {
    getCategories();
  }, []);
  async function getCategories() {
    const catRes = await fetch("http://localhost:8080/categories");
    const categoryData = await catRes.json();
    setCategory(categoryData);
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
    console.log(form);
  }
  async function getCategory(event) {
    try {
      event.preventDefault();
      console.log(form);
      const catRes = await fetch(
        `http://localhost:8080/messagesByCategory/${form.category}`
      );
      if (!catRes.ok) {
        throw new Error("Failed to fetch category");
      }
      const catData = await catRes.json();
      setMessagesByCat(catData);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Link to={"/"}>Log Out</Link>
      <Link to={"/messageBoard/:username"}>MessageBoard</Link>
      <form onSubmit={getCategory} className="MessageByCatForm">
        <select
          className="postCats"
          name="category"
          id="category"
          onChange={handleChange}
          value={form.category}
        >
          <option value="">Select a category</option>
          {category.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button>Search</button>
      </form>

      {messagesByCat.map(function (messagesByCat) {
        const jsonDate = new Date(messagesByCat.timestamp);
        const formattedDate = jsonDate.toLocaleDateString();
        const formattedTime = jsonDate.toLocaleTimeString();
        return (
          <div className="messageBox" key={messagesByCat.id}>
            <div
              className="messageBoxHeader"
              style={{ backgroundColor: messagesByCat.colour }}
            >
              <p className="user"> {messagesByCat.user} </p>
              <h4 className="category"> Category: {messagesByCat.category} </h4>
            </div>
            <div
              className="messageTextBox"
              style={{ backgroundColor: messagesByCat.colour }}
            >
              <p className="message"> {messagesByCat.message} </p>
            </div>
            <div
              className="messageBoxFooter"
              style={{ backgroundColor: messagesByCat.colour }}
            >
              <p className="likes"> likes: {messagesByCat.likes} </p>

              <p className="timeStamp">
                {" "}
                Posted: {formattedDate} at {formattedTime}{" "}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
