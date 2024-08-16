import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [signForm, setSignForm] = useState({
    name: "",
    password: "",
  });

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setSignForm({ ...signForm, [name]: value });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const result = await fetch("http://localhost:8080/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signForm),
      });
      if (result.ok) {
        console.log("data submited");
        navigate("/");
      } else {
        throw new Error("message:its broken ");
      }
    } catch (error) {
      console.log(error);
    }
    setSignForm({
      name: "",
      password: "",
    });
  }
  return (
    <div className="logindiv">
      <div className="loginNav">
        <Link to="/">Login</Link>
      </div>
      <h1 className="loginHead">Create a New Account</h1>
      <form className="signupForm" onSubmit={handleSubmit}>
        <label className="usernamelabel" htmlFor="username">
          Username
        </label>
        <input
          className="usernameBox"
          type="text"
          name="name"
          id="name"
          value={signForm.name}
          onChange={handleChange}
          placeholder="Enter Username"
          required
        />
        <label className="passwordLabel" htmlFor="password">
          Your password must contain at least one number and one uppercase and
          lowercase letter, and at between 8 & 15 characters.
        </label>
        <input
          className="passwordBox"
          type="password"
          name="password"
          id="password"
          value={signForm.password}
          onChange={handleChange}
          placeholder="Enter Password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}"
          required
        />
        <button className="signupBtn" type="Submit">
          Create A New Account
        </button>
      </form>
    </div>
  );
}
