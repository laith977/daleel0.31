"use client";

import { useEffect, useState } from "react";
import CarCard from "./CarCard";
import LoadingSkeleton from "@/app/Loading";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null); //to prevent too many requests
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;

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
          setCurrentPage(1); // Reset currentPage when search changes
          setAllPosts(searchResult); // Update allPosts state with filtered result
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
    const response = await fetch("/api/profile/car");
    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/profile/car");
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
        lowerCaseName.match(regex) ||
        lowerCaseMake.match(regex) ||
        lowerCaseFuel.match(regex)
      );
    });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="search-section">
      <form className="">
        <input
          type="text"
          placeholder="أبحث عن سيارة"
          value={searchText}
          onChange={handleSearchChange}
          className="search-text"
          required
        />
      </form>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="flex flex-row justify-center xl:space-x-28 my-6 max-sm:space-x-12">
            <button
              className="edit-button"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              الصفحة السابقة
            </button>
            <p className="text-white text-xl">
              يتم اظهار{" "}
              {`${(currentPage - 1) * postsPerPage + 1} - ${Math.min(
                currentPage * postsPerPage,
                filteredPosts(searchText).length
              )}  من الاعلانات `}
            </p>

            <button
              className="edit-button"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPosts.length < postsPerPage}
            >
              الصفحة التالية
            </button>
          </div>
          <CarCard handleTagClick={handleTagClick} data={currentPosts} />
        </>
      )}
    </section>
  );
};

export default Feed;
