import React from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginForm.scss";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

function LoginForm() {

  const notify = (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email || !password) {
      notify("Both fields are required.")
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/api/users/login`, {
        email: email,
        password: password,
      });

      sessionStorage.setItem("token", response.data.token);

      // redirect upon successful login
      window.location.href = "/home";
      // return;
    } catch (error) {
      notify(error.response.data)
      console.error(error.response.data)
    }
  };

  return (
    <>
      <section className="login">
        <div className="login__desktop-column">
          <h1 className="login__heading">Sign In</h1>
          <div className="login__register-link">
            No account yet? <br />
            Register <a href="./register">here!</a>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="login__form">
          <label
            className="login__form-label login__form-label--email"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="login__form-input login__form-input--email"
            type="text"
            id="email"
            name="email"
            placeholder="ringo@beatles.co.uk"
            autoComplete="email"
          />
          <label
            className="login__form-label login__form-label--password"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="login__form-input login__form-input--password"
            type="password"
            id="password"
            name="password"
            placeholder="********"
          />
          <button type="submit" className="login__form-submit">
            LET ME IN
          </button>
          {/* <a className='login__oauth' href={`${baseUrl}/auth/spotify`}>Or sign in via Spotify</a> */}
        </form>
      </section>
      <ToastContainer />
    </>
  );
}

export default LoginForm;
