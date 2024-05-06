import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function DoneComic() {
  const [homeData, setHomeData] = useState([]);
  var homeApi = "https://otruyenapi.com/v1/api/danh-sach/hoan-thanh";

  useEffect(() => {
    var getHome = async () => {
      try {
        var response = await fetch(homeApi);
        var data = await response.json();
        console.log(data);
        setHomeData(data.data.items);
      } catch (error) {
        console.log(error);
      }
    };

    getHome();
  }, [homeApi]);

  console.log(homeData);

  var setting = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 7,
    slidesToScroll: 7,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <div className="done__comic">
      <div className="slide__title">Đã hoàn thành </div>
      <Slider {...setting} className="slick">
        {homeData.length > 0 &&
          homeData.map((comic) => (
            <div key={comic._id} className="slides">
              <div className="slide">
                <img
                  className="home__img"
                  src={`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`}
                  alt="comics"
                />
                <Link to={`/read/${comic.slug}`} className="comic__name">
                  {comic.name}
                </Link>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default DoneComic;
