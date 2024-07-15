import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import Dropdown from "components/dropdown";
import { FiMenu } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "context/LoginProvider";

import clsx from "clsx";
import avatar from "../../assets/img/avatars/avatar3.png";

export default function Navbar() {
  const [isSideMenuOpen, setMenu] = useState(false);
  const { username } = useContext(LoginContext);

  const navlinks = [
    {
      label: "Jewelry",
      link: "#",
    },
    {
      label: "Orders",
      link: "/orders",
    },
  ];
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    navigate("/auth/");
  };
  return (
    <main>
      <nav className="flex items-center justify-between px-8 py-6 ">
        <div className="flex items-center gap-8">
          <section className="flex items-center gap-4">
            {/* menu */}
            <FiMenu
              onClick={() => setMenu(true)}
              className="text-3xl cursor-pointer lg:hidden"
            />
            {/* logo */}
            <Link to={"/home"} className="font-mono text-4xl text-bloom">
              Alumina
            </Link>
          </section>
          {navlinks.map((d, i) => (
            <Link
              key={i}
              className="hidden hover:text-black text-hemp lg:block"
              to={d.link}
            >
              {d.label}
            </Link>
          ))}
        </div>

        {/* sidebar mobile menu */}
        <div
          className={clsx(
            " bg-black/50 fixed right-0 top-0 h-full  w-screen -translate-x-full backdrop-blur-sm  transition-all  lg:hidden ",
            isSideMenuOpen && "translate-x-0"
          )}
        >
          <section className="absolute top-0 left-0 z-50 flex flex-col w-56 h-screen gap-8 p-8 text-black bg-white ">
            <IoCloseOutline
              onClick={() => setMenu(false)}
              className="mt-0 mb-8 text-3xl cursor-pointer"
            />

            {navlinks.map((d, i) => (
              <Link key={i} className="font-bold" to={d.link}>
                {d.label}
              </Link>
            ))}
          </section>
        </div>

        <div className="flex items-center">
          <Link to="/cart">
            <AiOutlineShoppingCart className="mr-8 text-2xl cursor-pointer" />
          </Link>
          <Dropdown
            button={
              <img
                className="w-10 h-10 rounded-full"
                src={avatar}
                alt="Elon Musk"
              />
            }
            children={
              <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                      👋 Hey, {username}
                    </p>{" "}
                  </div>
                </div>
                <div className="w-full h-px bg-gray-200 dark:bg-white/20 " />

                <div className="flex flex-col p-4">
                  <Link
                    to="/profile"
                    className="mt-3 text-sm font-medium text-blue-500 transition duration-150 ease-out hover:text-blue-500 hover:ease-in"
                  >
                    Profile
                  </Link>
                  <a
                    onClick={handleLogout}
                    className="mt-3 text-sm font-medium text-red-500 transition duration-150 ease-out hover:text-red-500 hover:ease-in"
                  >
                    Log Out
                  </a>
                </div>
              </div>
            }
            classNames={"py-2 top-8 -left-[180px] w-max"}
          />
        </div>
      </nav>
      <hr className="" />
    </main>
  );
}
