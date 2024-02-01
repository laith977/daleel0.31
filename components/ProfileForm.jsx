import React from "react";
import FileUpload from "./FileUpload";

const ProfileForm = ({ type, post, setPost, submitting, handleSubmit }) => {
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];

        setPost({ ...post, image: base64String });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="profile-form"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="car-input-label"
        >
          أسم المستخدم:
        </label>
        <input
          value={post.name || ""}
          type="text"
          id="name"
          name="name"
          onChange={(e) => setPost({ ...post, name: e.target.value })}
          required
          className="car-input-text"
        />
      </div>
      <FileUpload handleImageChange={handleImageChange} />
      <div className="mb-4">
        <label
          htmlFor="bio"
          className="car-input-label"
        >
          التعريف الشخصي:
        </label>
        <textarea
          type="textarea"
          rows="6"
          id="bio"
          name="bio"
          value={post.bio || ""}
          onChange={(e) => setPost({ ...post, bio: e.target.value })}
          className="car-input-text "
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="phoneNumber"
          className="car-input-label"
        >
          الرقم الهاتفي:
        </label>
        <input
          value={post.phoneNumber || ""}
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          onChange={(e) => setPost({ ...post, phoneNumber: e.target.value })}
          className="car-input-text"
        />
      </div>



      <div className="mb-4">
        <button
          type="submit"
          disabled={submitting}
          className="submit-button"
        >
          {type}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
