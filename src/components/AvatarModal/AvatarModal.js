import React, { useState } from "react";
import axios from "axios";
import "./AvatarModal.scss";
const baseUrl = process.env.REACT_APP_BASE_URL;

function AvatarModal({modalToggle, user}) {
  const [fileUpload, setFileUpload] = useState(null)

  const fileSelected = (e) => {
    const file = e.target.files[0]
    setFileUpload(file)
  }

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", fileUpload)
    formData.append("user_email", user.email)
    await axios.post(`${baseUrl}/api/users/profile-img`, formData, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    })

    window.location.href = "/profile";
  }

  return (
    <div className="avatar-modal">
      <div className="avatar-modal__info">
        <div className="avatar-modal__top-row">
          <h2 className="avatar-modal__heading">Upload your new profile pic!</h2>
          <button onClick={modalToggle} className="avatar-modal__top-row--close"></button>
        </div>
        <form onSubmit={submit} className="avatar-modal__form">
          <label
            className="avatar-modal__upload-file"
            htmlFor="avatar-modal__upload"
          >
            Choose file
          </label>
          <input
            type="file"
            accept="image/*"
            className="avatar-modal__upload-file--input"
            id="avatar-modal__upload"
            name="avatar-modal__upload"
            onChange={fileSelected}
          />
          <button className={fileUpload ? "avatar-modal__upload-file avatar-modal__upload-file--submit" : "avatar-modal__upload-file avatar-modal__upload-file--pending"}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AvatarModal;
