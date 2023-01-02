import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCartPlus,
  faShippingFast,
  faSearch,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({ search, setSearch, totalItems, isLogin }) => {
  return (
    <div>
      <header>
        <div className="navbar navbar-dark bg-secondary shadow-sm">
          <div className="navbar-brand align-item-center d-flex">
            <FontAwesomeIcon
              icon={faShippingFast}
              style={{ fontSize: "50px", marginTop: "-10px" }}
            />
            <strong style={{ fontSize: "30px" }}>Shopping Bazar</strong>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <FontAwesomeIcon icon={faSearch} style={{ marginTop: "10px" }} />
          </div>
          {isLogin && (
            <Link to="/login">
              <button className="btn btn-success">
                <span style={{ marginRight: "10px" }}>Login as Admin</span>
                <FontAwesomeIcon icon={faUserTie} />
              </button>
            </Link>
          )}

          <Link style={{ color: "honeydew", fontSize: "10px" }} to="/cart">
            <button className="btn btn-primary">
              <FontAwesomeIcon style={{ fontSize: "30px" }} icon={faCartPlus} />
              <span className="badge bg-danger">{totalItems}</span>
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
