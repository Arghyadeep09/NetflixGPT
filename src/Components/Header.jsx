import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = (props) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log("Error signing out:", error);
        navigate("/error");
      });
  };

  const { className } = props;
  return (
    <div
      className={`absolute px-32 py-1 bg-linear-to-b from-black z-10 flex justify-between ${
        className || ""
      }`}
    >
      <img
        className="w-48"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Logo"
      />

      {user && (
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-4 cursor-pointer">
            <img src={user?.photoURL} alt="Photo" />
          </div>
          <button
            className=" font-bold rounded-lg text-white cursor-pointer hover:text-red-700 "
            onClick={handleSignout}
          >
            SignOut
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
