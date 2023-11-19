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
      className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-600"
        >
          Name:
        </label>
        <input
          value={post.name || ""}
          type="text"
          id="name"
          name="name"
          onChange={(e) => setPost({ ...post, name: e.target.value })}
          required
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <FileUpload handleImageChange={handleImageChange} />
      <div className="mb-4">
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-600"
        >
          Bio:
        </label>
        <textarea
          type="textarea"
          rows="6"
          id="bio"
          name="bio"
          value={post.bio || ""}
          onChange={(e) => setPost({ ...post, bio: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 "
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="subscription"
          className="block text-sm font-medium text-gray-600"
        >
          Subscription:
        </label>
        <select
          value={post.subscription || ""}
          id="subscription"
          name="subscription"
          onChange={(e) => setPost({ ...post, subscription: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="Free">Free</option>
          <option value="Premium">Premium</option>
          <option value="Basic">Basic</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-600"
        >
          Phone Number:
        </label>
        <input
          value={post.phoneNumber || ""}
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          onChange={(e) => setPost({ ...post, phoneNumber: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="number_of_cars"
          className="block text-sm font-medium text-gray-600"
        >
          Number of Cars:
        </label>
        <input
          value={post.number_of_cars || ""}
          type="number"
          id="number_of_cars"
          name="number_of_cars"
          onChange={(e) => setPost({ ...post, number_of_cars: e.target.value })}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
        >
          {submitting ? `${type}ing...` : type}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
