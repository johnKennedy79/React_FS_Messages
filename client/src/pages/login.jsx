import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState("");
  const [loginForm, setLoginForm] = useState({
    name: "",
    password: "",
  });
  useEffect(() => {
    userValidation();
  }, []);

  function handleChange(event) {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  }

  const userValidation = async (event) => {
    event.preventDefault();
    console.log("form submited");
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("userName", loginForm.name);
      localStorage.setItem("validation", true);
      navigate(`/messages/${loginForm.name}`);
    } else {
      setValidationError(
        data.error ||
          "Login failed. Please check & try again or sign up if you do not already have an account."
      );
    }
    setLoginForm({
      name: "",
      password: "",
    });
  };
  return (
    <div>
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
        />
        <label className="passwordLabel" htmlFor="password">
          Password
        </label>
        <input
          className="passwordBox"
          type="password"
          name="password"
          id="password"
          value={loginForm.password}
          onChange={handleChange}
          placeholder="Enter Password"
        />
        <button type="Submit">Login</button>
      </form>
      {validationError && <p className="vError">{validationError}</p>}
    </div>
  );
}
