import "./Home.css";
import { useState } from "react";
import RightBar from "../Right bar/RightBar";
import NewsComic from "./NewsComic";
import DoneComic from "./DoneComic";
import Banner from "../Asset/banner3.jpg";
import ads1 from "../Asset/ads1.webp";
import ads2 from "../Asset/ads2.webp";
import ads3 from "../Asset/ads3.gif";

function HomePage() {
  const [close, setClose] = useState("");
  function closeAds() {
    setClose("none");
  }
  return (
    <div>
      <div className="banner__container">
        <img alt="banner" src={Banner} className="main__banner banner" />
      </div>
      <div className="ads" style={{ display: close }}>
        <div
          className="close__btn"
          onClick={() => {
            closeAds();
          }}
        >
          <i class="fa-solid fa-circle-xmark"></i>
        </div>
        <img alt="ads" src={ads1} />
        <img alt="ads" src={ads2} />
        <img alt="ads" src={ads3} />
      </div>
      <div className="home__container">
        <div className="home__page">
          <NewsComic />
          <DoneComic />
        </div>
        {/* Right Navbar */}
        <RightBar />
      </div>
    </div>
  );
}

export default HomePage;
