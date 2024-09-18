import React from "react";
import axios from "axios";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginForm.scss";
const baseUrl = process.env.REACT_APP_BASE_URL;

interface LoginFormProps {
  signedIn: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ signedIn }) => {
  const notify = (message: string) => {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email:string = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password:string = (form.elements.namedItem('password') as HTMLInputElement).value;

    if (!email || !password) {
      notify("Both fields are required.");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/api/users/login`, {
        email: email,
        password: password,
      });

      sessionStorage.setItem("token", response.data.token);

      window.location.href = "/home";
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        notify(error.response?.data || "An error occured.");
        console.error(error.response?.data);
      } else {
        notify("An unexpected error occured.");
      }
    }
  };

  return (
    <>
      <section className="login">
        <div className="login__main-login">
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
              type="email"
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
            <button
              type="submit"
              className={
                !signedIn
                  ? "login__form-submit"
                  : "login__form-submit login__form-submit--pending"
              }
            >
              {!signedIn ? "LET ME IN" : ""}
            </button>
          </form>
        </div>
        <p>- or -</p>
        <article className="login__oauth-links">
          <a
            className="login__oauth login__oauth--google"
            href={`${baseUrl}/auth/google`}
          >
            Login with Google
          </a>
          <a
            className="login__oauth login__oauth--spotify"
            href={`${baseUrl}/auth/spotify`}
          >
            Login with Spotify
          </a>
        </article>
      </section>
    </>
  );
}

export default LoginForm;
