import React from "react";
import { Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {toggleTheme} from "./../../redux/slices/themeSlice"

const Theme = ({ className }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  return (
    <button className={`btn btn-ghost btn-circle ${className}`} onClick={() => dispatch(toggleTheme())}>
      {theme === "dark" ? <Sun className="text-yellow-500" /> : <Moon />}
    </button>
  );
};

export default Theme;
