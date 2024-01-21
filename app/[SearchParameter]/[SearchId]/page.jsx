"use client";

import { useEffect, useState } from "react";
import CarCard from "@/components/CarCard";

const TypeSearch = ({ params }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  //SEARCH
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null); //to prevent too many requests

  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    clearTimeout(searchTimeout);
    setSearchText(inputValue);

    //debounce search
    setSearchTimeout(
      setTimeout(() => {
        if (inputValue.trim() === "") {
          fetchPosts();
        } else {
          const searchResult = filteredPosts(inputValue);
          setAllPosts(searchResult);
        }
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);

    const searchResult = filteredPosts(tag);
    setAllPosts(searchResult);
  };

  const fetchPosts = async () => {
    const response = await fetch(
      `/api/${params.SearchParameter}/${params.SearchId}`
    );
    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `/api/${params.SearchParameter}/${params.SearchId}`
        );
        const data = await response.json();
        setAllPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = (searchText) => {
    if (!searchText.trim()) {
      return allPosts;
    }

    const regex = new RegExp(searchText, "i");

    return allPosts.filter((item) => {
      const lowerCaseName = item.name.toLowerCase();
      const lowerCaseMake = item.make.toLowerCase();
      const lowerCaseFuel = item.fuel.toLowerCase();

      return (
        lowerCaseName.includes(searchText.toLowerCase()) ||
        lowerCaseMake.includes(searchText.toLowerCase()) ||
        lowerCaseFuel.includes(searchText.toLowerCase())
      );
    });
  };
  return (
    <section className="text-center px-12 max-sm:px-4   mx-auto mb-6 mt-48">
      <form className="">
        <input
          type="text"
          placeholder="أبحث عن سيارة"
          value={searchText}
          onChange={handleSearchChange}
          className="  rounded-lg text-center p-4 mx-auto my-6 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
          required
        />
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <CarCard handleTagClick={handleTagClick} data={allPosts} />
        </div>
      )}
    </section>
  );
};

export default TypeSearch;
