import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState("");
  const [loginForm, setLoginForm] = useState({
    name: "",
    password: "",
  });
  useEffect(() => {
    userValidation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(event) {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  }
  //user entry validation
  const userValidation = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("userName", loginForm.name);
      localStorage.setItem("validation", true);
      navigate(`/messageBoard/${loginForm.name}`);
    } else {
      setValidationError(
        data.error ||
          "Login failed. Please check & try again or sign up if you do not already have an account."
      );
      localStorage.setItem("validation", false);
    }
    setLoginForm({
      name: "",
      password: "",
    });
  };
  return (
    <div>
      <Link to="/signup"> Sign Up</Link>
      <h1>Login to Message Board</h1>
      <form className="loginForm" onSubmit={userValidation}>
        <label className="usernamelabel" htmlFor="username">
          Username
        </label>
        <input
          className="usernameBox"
          type="text"
          name="name"
          id="name"
          value={loginForm.name}
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
          value={loginForm.password}
          onChange={handleChange}
          placeholder="Enter Password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}"
          required
        />
        <button type="Submit">Login</button>
      </form>
      {validationError && <p className="vError">{validationError}</p>}
    </div>
  );
}
