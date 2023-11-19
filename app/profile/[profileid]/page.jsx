"use client";

import Profile from "@/components/Profile";
import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
const UserProfile = ({ params }) => {
  const router = useRouter();
  const [userPosts, setUserPosts] = useState({});
  const username = params.profileid;
  const handleEdit = async (post) => {
    router.push(`/profile/${params.profileid}/update-car/`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/profile/car/${params.carid}`, { method: "DELETE" });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/profile/${username}`);
      const data = await response.json();
      console.log(data);
      setUserPosts(data);
    };

    if (username) fetchPosts();
  }, [username]);

  return (
    <>
      <Profile
        data={userPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default UserProfile;
