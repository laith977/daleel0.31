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
      <header className="nav-header">
        <nav className="nav-body">
          <div>
            <Link href="/">
              <Image
                unoptimized
                priority
                src="/images/blacklogo.jpg"
                alt="..."
                width={72} 
                height={48} 
                className="nav-pic" 
              />
            </Link>
          </div>
          <div
            className={`nav-menu`}
            style={{ visibility: menuOpen ? "visible" : "hidden" }}
          ></div>
          <div className="flex items-center gap-4">
            {session?.user && (
              <button className="nav-buttons">
                {" "}
                {/* Adjusted padding */}
                <Link href="/profile/car">أضف سيارة</Link>
              </button>
            )}
            <button className="nav-buttons">
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
            <button
              onClick={toggleMenu}
              className="menu-toggle"
            >
              {" "}
              {/* Adjusted font size */}
              {menuOpen && session?.user ? "×" : "☰"}
            </button>
          </div>
        </nav>
      </header>
      {menuOpen && session?.user && (
        <div className="menu-container">
          <p className="menu-text">
            <Link href={session?.user && `/profile/edit`}>تعديل الحساب</Link>
          </p>
          <p className="menu-text">
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
