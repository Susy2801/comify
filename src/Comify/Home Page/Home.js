import "./Home.css";
import RightBar from "../Right bar/RightBar";
import NewsComic from "./NewsComic";
import DoneComic from "./DoneComic";
import Banner from "../Asset/banner2.jpg";

function HomePage() {
  var categoryApi = "https://otruyenapi.com/v1/api/the-loai";

  return (
    <div>
      <img alt="banner" src={Banner} className="main__banner" />
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
