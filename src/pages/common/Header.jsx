import React from "react";
import { Link } from "react-router-dom";
import { Logs, X } from "lucide-react";
import HeaderSearch from "../../components/sharedComponents/HeaderSearch";
import HeaderMenue from "../../components/sharedComponents/HeaderMenu";
import Theme from "../../components/sharedComponents/Theme";
import { useSelector } from "react-redux";
import HeaderNavEnd from "../../components/sharedComponents/HeaderNavEnd";

const Header = () => {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div className={`fixed top-0 w-full left-0 z-50 ${theme === "dark" ? "bg-gradient-to-l from-cyan-950 to-cyan-800" : "bg-neutral-50"}`}>
      <div
        className={`navbar ${theme === "dark" ? " bg-gratient-to-l from-cyan-950 to-cyan-800" : "bg-neutral-50"}`}
      >
        <div className="navbar-start md:hidden">
          {/*Fixed Drawer */}
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Button to open drawer */}
              <label
                htmlFor="my-drawer"
                className="btn btn-ghost btn-circle drawer-button"
              >
                <Logs />
              </label>
              {/* Dark Mode Toggle */}
              <Theme
                className="md:hidden"
              />
            </div>
            <div className="drawer-side z-50">
              <label htmlFor="my-drawer" className="drawer-overlay"></label>
              <div className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
                {/* Close Button */}
                <div className="flex justify-end">
                  <label
                    htmlFor="my-drawer"
                    className="btn btn-sm btn-circle btn-ghost"
                  >
                    <X size={20} />
                  </label>
                </div>

                <div className="max-h-[80vh] overflow-y-auto pr-2">
                  <HeaderMenue isMobile={true} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-center md:navbar-start">
          <Link to="/" className="btn btn-ghost text-xl underline font-serif text-yellow-600">
            Home Craft
          </Link>
          <Theme
            className="hidden md:block"
          />
        </div>

        {/* ✅ Large Screen Search */}
        <HeaderSearch
          className="hidden md:block md:navbar-center"
          inputClassName="w-24 md:w-96"
          placeholder="Search"
        />

      {/* nav bar end  */}
      <HeaderNavEnd />
        
      </div>
      {/* Small Screen Search */}
      <HeaderSearch
        className="flex justify-center w-full my-4 md:hidden"
        inputClassName="w-3/4 text-center"
        placeholder="Search"
      />

      {/* large screen Menu */}
      <div className="hidden md:block relative z-50">
        <HeaderMenue isMobile={false} theme={theme}/>
      </div>

      <div className="bg-yellow-600 p-1">
        <div className="flex justify-center border-2 border-amber-50">
          Our 10% offer is extended
        </div>
      </div>
    </div>
  );
};

export default Header;
