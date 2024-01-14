// import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import { ResultsContext } from "../contexts/resultsContext";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RestaurantIcon from "@mui/icons-material/Restaurant";
// import { AuthContext } from "../contexts/authContext";

function SideBar() {
  const pathname = useLocation().pathname;
  const currentUser = {
    id: "",
    profileicon: "",
  };
  //   const { results } = useContext(ResultsContext);
  //   const { currentUser } = useContext(AuthContext);

  return (
    <aside className="h-[calc(100vh-125px)] basis-1/4 bg-white mr-[20px] mt-[20px] rounded-md p-[20px] shadow-lg">
      <div>
        <ul className="flex flex-col items-center justify-center text-center gap-[5px]">
          <Link to="/" className="w-full h-full block items-center">
            <li
              className={
                pathname === "/"
                  ? "px-[20px] py-[15px] bg-slate-700 w-full h-full rounded-2xl text-white flex items-center gap-[10px] hover:opacity-[90%] duration-200"
                  : "px-[20px] py-[15px] bg-white w-full h-full rounded-2xl text-slate-900 flex items-center gap-[10px] hover:bg-slate-100 duration-200"
              }
            >
              <HomeIcon sx={{ fontSize: 22 }} />
              <span>Home</span>
            </li>
          </Link>
          <Link
            to={`/profile/${currentUser.id}`}
            className="w-full h-full block items-center"
            state={currentUser}
          >
            <li
              className={
                pathname === `/profile/${currentUser.id}`
                  ? "px-[20px] py-[15px] bg-slate-700 w-full h-full rounded-2xl text-white flex items-center gap-[10px] hover:opacity-[90%] duration-200"
                  : "px-[20px] py-[15px] bg-white w-full h-full rounded-2xl text-slate-900 flex items-center gap-[10px] hover:bg-slate-100 duration-200"
              }
            >
              <PersonIcon sx={{ fontSize: 22 }} />
              <span>User</span>
            </li>
          </Link>
          <Link to="/liked" className="w-full h-full block items-center">
            <li
              className={
                pathname === "/liked"
                  ? "px-[20px] py-[15px] bg-slate-700 w-full h-full rounded-2xl text-white flex items-center gap-[10px] hover:opacity-[90%] duration-200"
                  : "px-[20px] py-[15px] bg-white w-full h-full rounded-2xl text-slate-900 flex items-center gap-[10px] hover:bg-slate-100 duration-200"
              }
            >
              <FavoriteIcon sx={{ fontSize: 22 }} />
              <span>Saved</span>
            </li>
          </Link>
          <Link to="/simulate" className="w-full h-full block items-center">
            <li
              className={
                pathname === "/simulate"
                  ? "px-[20px] py-[15px] bg-slate-700 w-full h-full rounded-2xl text-white flex items-center gap-[10px] hover:opacity-[90%] duration-200"
                  : "px-[20px] py-[15px] bg-white w-full h-full rounded-2xl text-slate-900 flex items-center gap-[10px] hover:bg-slate-100 duration-200"
              }
            >
              <CalendarMonthIcon sx={{ fontSize: 22 }} />
              <span>Simulation</span>
            </li>
          </Link>
          <Link to="/results" className="w-full h-full block items-center">
            <li
              className={
                pathname === "/results"
                  ? "px-[20px] py-[15px] bg-slate-700 w-full h-full rounded-2xl text-white flex items-center gap-[10px] hover:opacity-[90%] duration-200"
                  : "px-[20px] py-[15px] bg-white w-full h-full rounded-2xl text-slate-900 flex items-center gap-[10px] hover:bg-slate-100 duration-200"
              }
            >
              <RestaurantIcon sx={{ fontSize: 22 }} />
              <span>Recipe</span>
            </li>
          </Link>
        </ul>
      </div>
      <div>
        <Link to="/publish">
          <button className="bg-slate-800 px-[30px] py-[12px] text-[18px] rounded-full text-white w-full hover:bg-slate-700 duration-200 mt-[20px]">
            Post
          </button>
        </Link>
      </div>
    </aside>
  );
}

export default SideBar;
