import { useEffect, useState } from "react";

export default function NewMessageForm() {
  const [category, setCategory] = useState([]);
  const [form, setForm] = useState({
    name: "",
    message: "",
    category: "",
    colour: "",
    timestamp: "now()",
  });

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    const response = await fetch("http://localhost:8080/categories");
    const categoryData = await response.json();
    setCategory(categoryData);
    console.log(categoryData);
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(form);
    await fetch("http://localhost:8080/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({
      name: "",
      message: "",
      category: "",
      colour: "",
      timestamp: "now()",
    });
  }
  return (
    <div className="postMessageBox">
      <h2>Leave a message</h2>
      <form onSubmit={handleSubmit} className="postMessageForm">
        <textarea
          className="postText"
          name="message"
          id="message"
          onChange={handleChange}
          value={form.message}
        ></textarea>
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

        <button className="sendPost">Send</button>
      </form>
    </div>
  );
}
