import React, { useState } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterForm.scss";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

function RegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [confirmPw, setConfirmPw] = useState<string>("");

  const notify = (type: string, message: string) => {
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPw(value);
    } else if (name === "confirmPassword") {
      setConfirmPw(value);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, fav_artists, location} = event.target as HTMLFormElement;

    const isValidEmail = (email: string) => {
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
        email: email,
        password: pw,
        name: name,
        fav_artists: fav_artists,
        location: location,
      });
      if (response && pw === confirmPw) {
        notify('success', "Successfully registered! You will be redirected momentarily...")
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
        event.currentTarget.reset();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        notify('error', error.response?.data);
        console.error(`Error status code ${error.response?.status}:`, error.response?.data);
      }
    }
  };

  return (
    <section className="register">
      <h1 className="register__heading">Sign up for Hit Me!</h1>
      <span className="register__login-link">
        Already signed up? Login <a href="./login">here</a>!
      </span>
      <article className="register__oauth-links">
        <a className='register__oauth register__oauth--google' href={`${baseUrl}/auth/google`}>Signup with Google</a>
        <a className='register__oauth register__oauth--spotify' href={`${baseUrl}/auth/spotify`}>Signup with Spotify</a>
      </article>
      <p className="register__divider">- or -</p>
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
            rows={5}
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
