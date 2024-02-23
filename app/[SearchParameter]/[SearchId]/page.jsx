"use client";

import { useEffect, useState } from "react";
import CarCard from "@/components/CarCard";
import carBrands from "@/constants/carBrands";
import LoadingSkeleton from "@/app/Loading";
const TypeSearch = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState(null); // Change initial state
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isBrandListOpen, setIsBrandListOpen] = useState(false);

  const postsPerPage = 20;

  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    setSearchText(inputValue);
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand === "All Cars" ? null : brand); // Set null for "All Cars"
    setCurrentPage(1); // Reset to the first page
    setIsBrandListOpen(false); // Close the brand list menu
  };
  const filterPosts = (posts, searchText, brand) => {
    let filtered = [...posts];

    if (brand && brand !== "All Cars") {
      filtered = filtered.filter((post) => post.make === brand);
    }

    if (searchText.trim() !== "") {
      const regex = new RegExp(searchText, "i");
      filtered = filtered.filter(
        (post) =>
          post.name.toLowerCase().match(regex) ||
          post.make.toLowerCase().match(regex) ||
          post.fuel.toLowerCase().match(regex)
      );
    }

    return filtered;
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

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    return (
      <div className="flex justify-center space-x-4 my-4">
        <button
          className="bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)] font-mono"></span>{" "}
          الصفحة السابقة
        </button>
        <p className="text-white text-xl font-mono">
          يتم اظهار{" "}
          {`${(currentPage - 1) * postsPerPage + 1} - ${Math.min(
            currentPage * postsPerPage,
            filteredPosts.length
          )}  من الاعلانات `}
        </p>
        <button
          className="bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)] font-mono"></span>{" "}
          الصفحة التالية
        </button>
      </div>
    );
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  // Apply filters
  const filteredPosts = filterPosts(allPosts, searchText, selectedBrand);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <section className="text-center px-12 max-sm:px-4   mx-auto mb-6 mt-48">
      <section className="search-section relative">
        <form className="">
          <div className="mx-auto flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center mx-auto">
              <input
                type="text"
                placeholder="أبحث عن سيارة"
                value={searchText}
                onChange={handleSearchChange}
                className="text-black rounded-lg text-center p-4 mx-auto my-6 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl flex-grow flex-shrink-0" // Added flex-shrink-0 to prevent the input from shrinking
                required
              />
              <div
                className="cursor-pointer py-4 bg-yellow-400 border-b-4 border-yellow-700 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group flex-grow flex-shrink-0" // Added flex-shrink-0 to prevent the button from shrinking
                style={{
                  backgroundColor: "rgb(254, 189, 89)", // Adjusted to use the correct syntax for RGB color
                }}
                onClick={() => setIsBrandListOpen(!isBrandListOpen)}
              >
                <span className=" font-mono bg-yellow-300 shadow-yellow-300 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(255, 255, 255, 0.3)]"></span>{" "}
                اختر المصنع
              </div>
            </div>

            {isBrandListOpen && (
              <div className=" top-full left-0 w-full max-w-xs max-h-40 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg z-10">
                <div
                  key={-1}
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer font-mono text-black"
                  onClick={() => handleBrandClick("All Cars")} // Update this line
                >
                  جميع السيارات{" "}
                </div>
                {carBrands.map((brand, index) => (
                  <div
                    key={index}
                    className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-black"
                    onClick={() => handleBrandClick(brand.brand)}
                  >
                    {brand.brand}
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>

        <div className="relative z-0 space-x-4">
          {renderPagination()}
          <CarCard handleTagClick={handleBrandClick} data={currentPosts} />
        </div>
      </section>
    </section>
  );
};

export default TypeSearch;
