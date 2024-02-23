import React, { useState, useEffect } from "react";
import Image from "next/image";
import CarCard from "@/components/CarCard";
import LoadingSkeleton from "@/app/Loading";
import carBrands from "@/constants/carBrands";

const Profile = ({ user, cars, handleDelete }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isBrandListOpen, setIsBrandListOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const postsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      setAllPosts(cars); // Set cars data to allPosts
    };
    fetchData();
  }, [cars]); // Update when cars prop changes

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand === "All Cars" ? null : brand);
    setCurrentPage(1);
    setIsBrandListOpen(false);
  };
  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    setSearchText(inputValue);
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

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    return (
      <div className="flex justify-center space-x-4 my-4">
        <button
          className="edit-button"
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
        >
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
          className="edit-button"
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          الصفحة التالية
        </button>
      </div>
    );
  };

  const filteredPosts = filterPosts(allPosts, searchText, selectedBrand);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="profile-div">
          <p className="profile-name">{user?.name}</p>
          <div className="flex flex-col">
            <div className="flex flex-col mx-auto  ">
              {user?.image && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "30vh",
                  }}
                >
                  <Image
                    unoptimized
                    style={{ borderRadius: "50%", width: "75%", height: "80%" }}
                    src={user?.image}
                    alt="Decoded Image"
                    width={500}
                    height={500}
                  />
                </div>
              )}
              <p
                className="profile-info2"
                style={{ color: "rgba(254, 189, 89, 1)" }}
              >
                {user?.subscription + ":الأشتراك"}
              </p>
              <p
                className="profile-info2"
                style={{ color: "rgba(254, 189, 89, 1)" }}
              >
                {cars?.length + ":عدد السيارات"}
              </p>
            </div>

            <div className="profile-stats max-sm:my-0">
              <div className="bg-slate-200 text-black mx-24 my-4 border-4 border-custom-yellow  max-sm:mx-0">
                <p className="profile-bio">{user?.bio}</p>
              </div>
              <button
                className="profile-phone-button"
                onClick={() =>
                  (window.location.href = `tel:${user?.phoneNumber}`)
                }
              >
                {user?.phoneNumber + "      :رقم الهاتف"}
              </button>
            </div>
          </div>
          <section className="search-section relative">
            <form className="">
              <div className="mx-auto flex flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-center mx-auto">
                  <input
                    type="text"
                    placeholder="أبحث عن سيارة"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="rounded-lg text-center p-4 mx-auto my-6 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl flex-grow flex-shrink-0 text-black" // Added flex-shrink-0 to prevent the input from shrinking
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
              {currentPosts.length > 0 ? (
                <CarCard
                  handleTagClick={handleBrandClick}
                  data={currentPosts}
                  handleDelete={handleDelete}
                />
              ) : (
                <p className="text-3xl"> لا يوجد سيارات معروضة</p>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Profile;
