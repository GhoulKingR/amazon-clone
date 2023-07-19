import React from "react";
import "./Header.css";
import AmazonLogo from "./assets/amazon_PNG11.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { signOut } from "@firebase/auth";
import { auth } from "./firebaseConfig";

function Header() {
  const [{ basket, user }] = useStateValue();
  const navigate = useNavigate();

  const handleAuthentication = () => {
    if (user) {
      signOut(auth);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={AmazonLogo} className="header__logo" alt="amazon logo" />
      </Link>
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <div className="header__option" onClick={handleAuthentication}>
          <span className="header__optionLineOne">
            Hello {user?.email || "Guest"}
          </span>
          <span className="header__optionLineTwo">
            {user === null ? "Sign In" : "Sign out"}
          </span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime </span>
        </div>
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
