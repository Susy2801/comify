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
  const [searchData, setSearchData] = useState([]);
  const [overviewHeight, setOverviewHeight] = useState(0);
  const categoryAPI = `https://otruyenapi.com/v1/api/the-loai`;
  const searchApi = `https://otruyenapi.com/v1/api/tim-kiem?keyword=${search}`;

  useEffect(() => {
    async function getCategory() {
      const response = await fetch(categoryAPI);
      const data = await response.json();
      setCategory(data.data.items);
      console.log(data);
    }

    getCategory();
  }, [categoryAPI]);

  useEffect(() => {
    async function searchOverview() {
      const response = await fetch(searchApi);
      const data = await response.json();
      setSearchData(data.data.items);
      console.log(data);
    }

    searchOverview();
  }, [search]);

  function handleEnter(e) {
    if (e.key === "Enter") {
      navigate(`/search/${search}`, { replace: true });
      setSearch("");
    }
  }

  function handleBlur(e) {
    e.target.value = "";
    setSearch("");
    setOverviewHeight("0");
  }

  function categoryEnter(e) {
    setCategoryHeight("700px");
    setCategoryPadding("10px");
  }

  function categoryLeave(e) {
    setCategoryHeight(0);
    setCategoryPadding("0px");
  }

  function handleFocus() {
    setOverviewHeight("600px");
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
        <div className="search__container">
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
            onFocus={(e) => {
              handleFocus(e);
            }}
          />

          <div className="overview__search" style={{ height: overviewHeight }}>
            {searchData.map((comic, index) => (
              <div key={index} className="search__info">
                <img
                  className="overview__img"
                  src={`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`}
                />
                <div className="overview__name">{comic.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
