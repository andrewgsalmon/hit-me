import React, { useEffect, useState } from "react";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "../../layout/Head";
import "./Login.scss";
import LoginForm from "../../components/LoginForm/LoginForm";

function Login() {
  const [signedIn, setSignedIn] = useState(false)

  const notify = () => {
    toast.success(
      `Successfully logged in! You will be redirected in a moment...`,
      {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      }
    );
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      sessionStorage.setItem("token", token);
      setSignedIn(true)
      notify()
      setTimeout(() => {
        window.location.href = "./home";
      }, 2000);
    }
  }, []);

  return (
    <>
      <Head
        title="Login"
        description="Login to discover amazing new music with Hit Me!"
        canonical="/login"
      />
      <LoginForm signedIn={signedIn} />
      {/* <ToastContainer /> */}
    </>
  );
}

export default Login;
