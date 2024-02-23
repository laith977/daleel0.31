"use client";
import { useEffect, useState, useRef } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null); // Create a ref for the menu

  const username = session?.user?.id;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/profile/${username}`);
      const data = await response.json();
      setUser(data.user);
    };

    if (username) fetchData();
  }, [username]);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(".menu-text") // Check if clicked element or its parent is a menu item
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false); // Close the menu when a menu item is clicked
  };

  return (
    <>
      <header className="nav-header">
        <nav className="nav-body">
          <div>
            <Link href="/">
              <Image
                unoptimized
                priority
                src="/images/blacklogo.jpg"
                alt="navbar logo"
                width={72}
                height={48}
                className="nav-pic"
              />
            </Link>
          </div>
          <div
            className={`nav-menu`}
            style={{ visibility: menuOpen ? "visible" : "hidden" }}
            ref={menuRef} // Assign the ref to the menu container
          ></div>
          <div className="flex items-center gap-4">
            {session?.user && (
              <button
                className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                style={{ height: "auto", width: "auto" }} // Set height and width to auto
              >
                <Link href="/profile/car">أضف سيارة</Link>
              </button>
            )}

            <button
              className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              style={{ height: "auto", width: "auto" }}
            >
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
                  href="/"
                  onClick={() => {
                    signIn();
                  }}
                >
                  تسجيل الدخول
                </Link>
              )}
            </button>

            <button onClick={toggleMenu} className="menu-toggle">
              {session?.user && (
                <div className="relative">
                  <Image
                    className="rounded-full max-sm:h-auto max-sm:w-auto p-1"
                    src={user?.image || "/favicon.ico"}
                    alt="pic"
                    width={50}
                    height={50}
                    unoptimized
                  />
                </div>
              )}
            </button>
          </div>
        </nav>
      </header>
      {menuOpen && session?.user && (
        <div className="menu-container">
          <p className="menu-text">
            <Link
              href={session && `/profile/edit`}
              onClick={handleMenuItemClick}
            >
              تعديل الحساب
            </Link>
          </p>
          <p className="menu-text">
            <Link
              href={session && `/profile/${session?.user.id}`}
              onClick={handleMenuItemClick}
            >
              حسابي
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Nav;
