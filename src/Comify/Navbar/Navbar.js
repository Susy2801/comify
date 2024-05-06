import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import logo from "../Asset/logo2.png";

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [categoryHeight, setCategoryHeight] = useState(0);
  const [categoryPadding, setCategoryPadding] = useState(0);
  const [category, setCategory] = useState([]);
  const categoryAPI = `https://otruyenapi.com/v1/api/the-loai`;

  useEffect(() => {
    async function getCategory() {
      const response = await fetch(categoryAPI);
      const data = await response.json();
      setCategory(data.data.items);
      console.log(data);
    }

    getCategory();
  }, [categoryAPI]);

  function handleEnter(e) {
    if (e.key === "Enter") {
      navigate(`/search/${search}`, { replace: true });
      setSearch("");
    }
  }

  function handleBlur(e) {
    e.target.value = "";
  }

  function categoryEnter(e) {
    setCategoryHeight("700px");
    setCategoryPadding("10px");
  }

  function categoryLeave(e) {
    setCategoryHeight(0);
    setCategoryPadding("0px");
  }

  return (
    <div className="navbar__container">
      <div className="navigation">
        <img src={logo} alt="Logo" className="main__logo" />
        <nav className="nav__bar">
          <Link to="/">Trang chủ</Link>
          <Link to="/">Cái gì đó</Link>
          <div
            className="category__container"
            onMouseEnter={(e) => {
              categoryEnter(e);
            }}
            onMouseLeave={(e) => {
              categoryLeave(e);
            }}
          >
            <Link to="#!">Thể loại</Link>
            <div
              className="category__box"
              style={{ height: categoryHeight, padding: categoryPadding }}
            >
              {category.map((type, index) => (
                <div>{type.name}</div>
              ))}
            </div>
          </div>
        </nav>
        <input
          value={search}
          placeholder="Tìm kiếm"
          className="search__bar"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            handleEnter(e);
          }}
          onBlur={(e) => {
            handleBlur(e);
          }}
        />
      </div>
    </div>
  );
}

export default Navbar;
