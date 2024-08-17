import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function NewMessageForm() {
  const [category, setCategory] = useState([]);
  const [user, setUser] = useState([null]);
  const { username } = useParams(user);
  const [form, setForm] = useState({
    name: "",
    message: "",
    timestamp: "now()",
    category: "",
  });
  useEffect(() => {
    getCategories();
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //get category data
  async function getCategories() {
    const catRes = await fetch(
      "https://react-fs-messages.onrender.com/categories"
    );
    const categoryData = await catRes.json();
    setCategory(categoryData);
  }

  //get userdata
  async function getUser() {
    try {
      const useRes = await fetch(
        `https://react-fs-messages.onrender.com/users/${username}`
      );
      if (!useRes.ok) {
        throw new Error("Failed to fetch user");
      }
      const userData = await useRes.json();
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  }

  //handle change of form
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  }

  //handle submit of form
  async function handleSubmit(event) {
    event.preventDefault();
    const submissionData = { ...form, name: user ? user.id : "" };
    const result = await fetch(
      "https://react-fs-messages.onrender.com/messages",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      }
    );
    if (result.ok) {
      location.reload();
      setForm({
        name: "",
        message: "",
        category: "",
      });
    } else {
      console.error("Failed to post new message.");
    }
  }

  return (
    <div className="postMessageBox">
      <h2 className="postTitle">Leave a message</h2>
      <form onSubmit={handleSubmit} className="postMessageForm">
        <textarea
          className="postText"
          name="message"
          id="message"
          onChange={handleChange}
          value={form.message}
          placeholder="Enter your new message here..."
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
