import React, { useState } from "react";
import axios from "axios";
import "./AvatarModal.scss";
import {User} from '../../types/user'
import { ToastContainer, Flip, toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BASE_URL;

interface AvatarModalProps {
  user: User;
  modalToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function AvatarModal({ modalToggle, user }:AvatarModalProps) {
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [maxFileExceeded, setMaxFileExceeded] = useState<boolean>(false);

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
    }
  };

  const fileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const maxFileSize = 1024 ** 2 * 2;

    if (file && file.size > maxFileSize) {
      setMaxFileExceeded(true);
    } else if (file) {
      setFileUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!fileUpload) {
      console.error("You gotta select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", fileUpload);
    formData.append("user_email", user.email);

    try {
      await axios.post(
        `${baseUrl}/api/users/profile-img`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );

      window.location.href = "/profile";
    } catch (error) {
      notify("error", "There was an error uploading your photo!")
      console.error(error);
    }
  };

  return (
    <div className="avatar-modal">
      <div className="avatar-modal__info">
        <div className="avatar-modal__top-row">
          <h2 className="avatar-modal__heading">
            Upload your new profile pic!
          </h2>
          <button
            onClick={modalToggle}
            className="avatar-modal__top-row--close"
          ></button>
        </div>
        <form onSubmit={handleSubmit} className="avatar-modal__form">
          <label
            className="avatar-modal__upload-file"
            htmlFor="avatar-modal__upload"
          >
            Choose file
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            className="avatar-modal__upload-file--input"
            id="avatar-modal__upload"
            name="avatar-modal__upload"
            onChange={fileSelected}
          />
          {maxFileExceeded ? (
            <button className="avatar-modal__upload-file avatar-modal__upload-file--max-filesize-exceeded">
              Image must be under 2MB!
            </button>
          ) : (
            <button
              className={
                fileUpload
                  ? "avatar-modal__upload-file avatar-modal__upload-file--submit"
                  : "avatar-modal__upload-file avatar-modal__upload-file--pending"
              }
            >
              Submit
            </button>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AvatarModal;
