import React, { useState } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterForm.scss";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const notify = (type, message) => {
    if (type === "error") {
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
    } else if (type === 'success') {
      toast.success(message, {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    }
  };

  const handleChange = (event) => {
    let { name, value } = event.target;

    if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPw(value);
    } else if (name === "confirmPassword") {
      setConfirmPw(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    if (!isValidEmail(email)) {
      notify("error", "Please input a valid email address!")
      return;
    }

    if (pw !== confirmPw) {
      notify(
        "error",
        "Whoops! Your passwords don't match... let's try that again."
      );
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/api/users/register`, {
        email: event.target.email.value,
        password: event.target.password.value,
        name: event.target.display_name.value,
        fav_artists: event.target.artists.value,
        location: event.target.location.value,
      });
      if (response && pw === confirmPw) {
        notify('success', "Successfully registered! You will be redirected momentarily...")
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
        event.target.reset();
      }
    } catch (error) {
      notify('error', error.response.data)
      console.error(`Error status code ${error.response.status}:`, error.response.data)
    }
  };

  return (
    <section className="register">
      <h1 className="register__heading">Sign up for Hit Me!</h1>
      <span className="register__login-link">
        Already signed up? Login <a href="./login">here</a>!
      </span>
      {/* <a className='register__oauth' href={`${baseUrl}/auth/google`}>Sign up with Google</a>
      <p className="register__divider">- or -</p> */}
      <form onSubmit={handleSubmit} className="register__form">
        <div className="register__form--tablet-column">
          <label
            className="register__form-label register__form-label--name"
            htmlFor="display_name"
          >
            Display Name
          </label>
          <input
            className="register__form-input register__form-input--name"
            type="text"
            id="display_name"
            name="display_name"
            placeholder="required"
          />
          <label
            className="register__form-label register__form-label--email"
            htmlFor="email"
          >
            Email
          </label>
          <input
            onChange={handleChange}
            className="register__form-input register__form-input--email"
            type="email"
            name="email"
            id="email"
            placeholder="required"
            autoComplete="email"
          />
          <label
            className="register__form-label register__form-label--password"
            htmlFor="password"
          >
            Password*
          </label>
          <input
            onChange={handleChange}
            className="register__form-input register__form-input--password"
            type="password"
            name="password"
            id="password"
            placeholder="required"
          />
          <label
            className="register__form-label register__form-label--confirm-password"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            onChange={handleChange}
            className="register__form-input register__form-input--confirm-password"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="required"
          />
        </div>
        <div className="register__form--tablet-column">
          <label
            className="register__form-label register__form-label--location"
            htmlFor="location"
          >
            Location
          </label>
          <input
            className="register__form-input register__form-input--location"
            type="text"
            name="location"
            id="location"
          />
          <label
            className="register__form-label register__form-label--artists"
            htmlFor="artists"
          >
            Name a few of your favourite artists
          </label>
          <textarea
            className="register__form-input register__form-input--artists"
            rows="5"
            name="artists"
            id="artists"
          />
          <button className="register__form-submit">Submit</button>
        </div>
      </form>
      <p className="register__form-input--password-disclaimer">*Passwords are encrypted with bcrypt.</p>
      <ToastContainer />
    </section>
  );
}

export default RegisterForm;
