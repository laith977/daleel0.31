"use client";
import ProfileForm from "@/components/ProfileForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
const initialPostState = {
  name: "",
  bio: "",
  phoneNumber: "",
};
const UpdateProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState(initialPostState);
  const userId = session?.user.id;
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await fetch(`/api/profile/edit-profile`);
        const data = await response.json();
        if (data.name !== undefined) {
          setPost((prevState) => ({
            ...prevState,
            name: data.name,
            bio: data.bio || "",
            phoneNumber: data.phoneNumber || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userId) {
      getUserDetails();
    }
  }, [userId]);
  const updateProfile = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (!userId) return alert("User ID not found");
      const response = await fetch(`/api/profile/edit-profile`, {
        method: "PATCH",
        body: JSON.stringify({
          name: post.name,
          bio: post.bio,
          phoneNumber: post.phoneNumber,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to update profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <ProfileForm
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateProfile}
    />
  );
};

export default UpdateProfile;
