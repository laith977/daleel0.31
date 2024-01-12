"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className="bg-white fixed top-0 w-full z-10">
        <nav className="flex justify-between items-center w-full md:w-[92%] mx-auto py-2">
          <div>
            <Link href="/">
              <Image
                unoptimized
                priority
                src="/images/blacklogo.jpg"
                alt="..."
                width={72} // Reduced the width
                height={48} // Reduced the height
                className="cursor-pointer m-2 rounded-sm" // Adjusted the margin
              />
            </Link>
          </div>
          <div
            className={`md:min-h-fit min-h-[16vh] transform md:translate-x-0 md:w-auto w-full flex items-center px-3`} // Adjusted height and padding
            style={{ visibility: menuOpen ? "visible" : "hidden" }}
          ></div>
          <div className="flex items-center gap-4">
            {" "}
            {/* Adjusted the gap */}
            {session?.user && (
              <button className="bg-[#5c97ff] text-white px-4 py-2 rounded-full hover:bg-[#367fff]">
                {" "}
                {/* Adjusted padding */}
                <Link href="/profile/car">أضف سيارة</Link>
              </button>
            )}
            <button className="bg-[#5c97ff] text-white px-4 py-2 rounded-full hover:bg-[#1b6eff]">
              {" "}
              {/* Adjusted padding */}
              {session?.user ? (
                <Link
                  href="/"
                  onClick={() => {
                    signOut();
                  }}
                >
                  تسجيل الخروج
                </Link>
              ) : (
                <Link
                  className="p-2 m-0"
                  href=""
                  onClick={() => {
                    signIn();
                  }}
                >
                  تسجيل الدخول
                </Link>
              )}
            </button>
            <button onClick={toggleMenu} className="text-2xl cursor-pointer">
              {" "}
              {/* Adjusted font size */}
              {menuOpen && session?.user ? "×" : "☰"}
            </button>
          </div>
        </nav>
      </header>
      {menuOpen && session?.user && (
        <div className="flex flex-col fixed top-16 right-0 w-48 bg-gray-600 z-10">
          <p className="text-black bg-white text-center text-md p-3 hover:bg-[#bbbbbb]">
            <Link href={session?.user && `/profile/edit`}>تعديل الحساب</Link>
          </p>
          <p className="text-black bg-white text-center text-md p-3 hover:bg-[#bbbbbb]">
            <Link href={session?.user && `/profile/${session?.user.id}`}>
              حسابي
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Nav;
