import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function NewMessageForm() {
  const [category, setCategory] = useState([]);
  const [user, setUser] = useState([null]);
  const { username } = useParams();
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
    const catRes = await fetch("http://localhost:8080/categories");
    const categoryData = await catRes.json();
    setCategory(categoryData);
  }
  //get userdata
  async function getUser() {
    try {
      const useRes = await fetch(`http://localhost:8080/users/${username}`);
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
    try {
      event.preventDefault();
      const submissionData = { ...form, name: user ? user.id : "" };
      const result = await fetch("http://localhost:8080/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
      if (!result.ok) {
        throw new Error("message:its broken ");
      }
      setForm({
        name: "",
        message: "",
        category: "",
      });
      console.log("data submited");
    } catch (error) {
      console.log(error);
    }
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
