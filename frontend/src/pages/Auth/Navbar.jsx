  import React, { useState, useEffect } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import { UserCircleIcon } from "@heroicons/react/24/solid";
  import {
    Navbar,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { logout } from "../../redux/features/auth/authSlice"
  import { useLogoutMutation } from "../../redux/api/usersApiSlice";
  import { Link, useNavigate } from "react-router-dom";

  export default function NavbarDefault() {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

    const [logoutApiCall] = useLogoutMutation();
    const logoutHandler = async () => {
      const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
      } catch (error) {
        console.error(error);
      }}
    };

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 960) {
          setOpenNav(false);
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
      <nav className="w-full h-11 border-none bg-[#1f2833]">
        <div className="container mx-auto flex items-center justify-between  text-blue-gray-900">
          <Typography
            as="a"
            color="white"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            EMS
          </Typography>
          
          <div className="flex items-center gap-x-1">
            
          {!userInfo && (
              <Button variant="gradient" size="sm" className="bg-blue-500 origin-top-right mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link
                  to="/login"
                  
                >
                  <span className="nav-item-name">LOGIN</span>
                </Link>
              </Button>  
          )}
         <div className="relative inline-block text-left">
      {userInfo && (
        <div className="flex">
          <span className="text-white p-2">{userInfo.username}</span>
          <UserCircleIcon
            color="white"
            className="h-10 w-10 rounded-lg mr-5"
            id="account-menu"
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded="true"
          >
            
          </UserCircleIcon>

          {dropdownOpen && (
            <div
              className="origin-top-right absolute right-0 mt-11 w-56 rounded-md shadow-lg bg-[#5d6774]  ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="account-menu"
            >
              <div className="py-1" role="none">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-white  hover:text-white-900"
                  role="menuitem"
                  onClick={toggleDropdown}
                >
                  Profile
                </Link>
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm text-white  hover:text-white-900"
                  role="menuitem"
                  onClick={() => { logoutHandler(); toggleDropdown(); }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>          
          </div>
        </div>
      </nav>
    );
  }
