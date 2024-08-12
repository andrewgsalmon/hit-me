import React, { useState } from "react";
import axios from "axios";
import "./AvatarModal.scss";
const baseUrl = process.env.REACT_APP_BASE_URL;

function AvatarModal({ modalToggle, user }) {
  const [fileUpload, setFileUpload] = useState(null);
  const [maxFileExceeded, setMaxFileExceeded] = useState(false);

  const fileSelected = (e) => {
    const file = e.target.files[0];
    const maxFileSize = 1024 ** 2 * 2;

    if (file.size > maxFileSize) {
      setMaxFileExceeded(true);
    } else {
      setFileUpload(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    </div>
  );
}

export default AvatarModal;
