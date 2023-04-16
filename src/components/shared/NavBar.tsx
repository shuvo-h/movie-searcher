import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import logo from "../../asset/image/logo-movie.png"

const navList = [
  { title: "Home", path: "/" },
  { title: "Favourite List", path: "/favourite" },
];

const NavBar = (): JSX.Element => {
  const { pathname } = useRouter();
  const [isExpand,setIsExpand] = useState(false);
  const toggleExpand = () => {
    setIsExpand((prevState) => !prevState);
  };
  useEffect(()=>{
    const handleResize = () =>{
        if (window.innerWidth > 640) {
            setIsExpand(false);
        }
    }
    window.addEventListener("resize",handleResize);
    return ()=> window.removeEventListener("resize",handleResize);
  },[])
  
  
  return (
    <nav className="bg-indigo-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                className="h-8 w-8"
                src={logo.src}
                width={60}
                height={40}
                alt="Your Company"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navList.map((navEl) => (
                  <Link
                    href={navEl.path}
                    passHref={true}
                    legacyBehavior
                    key={navEl.title}
                  >
                    <a
                      className={`text-black-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${pathname === navEl.path ? "bg-cyan-900 text-cyan-300" : ""}`}
                    >
                      {navEl.title}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={toggleExpand}
              type="button"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden" id="mobile-menu">
        {
            isExpand && <div className="min-h-screen space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navList.map((navEl) => (
                    <Link
                      href={navEl.path}
                      passHref={false}
                      legacyBehavior
                      key={navEl.title}
                    >
                      <a
                        className={`text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium ${pathname === navEl.path ? "bg-gray-900 text-white" : ""}`}
                      >
                        {navEl.title}
                      </a>
                    </Link>
                  ))}
          </div>
        }
        
      </div>
    </nav>
  );
};

export default NavBar;
