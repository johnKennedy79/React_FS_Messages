import { useEffect, useState } from "react";
import thumb from "../assets/img/thumb_up_16_pink.png";
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
    const catRes = await fetch(
      "https://react-fs-messages.onrender.com/categories"
    );
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
        `https://react-fs-messages.onrender.com/messagesByCategory/${form.category}`
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
    <div className="search">
      <form onSubmit={getCategory} className="MessageByCatForm">
        <select
          className="postCats"
          name="category"
          id="category"
          onChange={handleChange}
          value={form.category}
        >
          <option value="" className="catSelect">
            Select a category
          </option>
          {category.map((category) => (
            <option
              key={category.id}
              value={category.id}
              className="catSearchSelect"
            >
              {category.name}
            </option>
          ))}
        </select>
        <button className="searchBtn">Search</button>
      </form>
      <div className="searchMBDiv">
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
                <h4 className="category">Category: {messagesByCat.category}</h4>
              </div>
              <div className="messageTextBox">
                <p className="message"> {messagesByCat.message} </p>
              </div>
              <div
                className="messageBoxFooter"
                style={{ backgroundColor: messagesByCat.colour }}
              >
                <div className="thumbContainer">
                  <img className="thumb" src={thumb} alt="pink thums up" />
                  <p className="likes"> {messagesByCat.likes} </p>
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
