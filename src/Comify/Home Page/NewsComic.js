import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import React from "react";
import "./Home.css";

function NewsComic() {
  const [homeData, setHomeData] = useState([]);

  var homeApi = "https://otruyenapi.com/v1/api/home";

  function timeForm(stamp) {
    // Tạo một đối tượng Date từ chuỗi time stamp
    const date = new Date(stamp);

    // Lấy ngày, tháng và năm
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const year = date.getFullYear();

    // Định dạng ngày/tháng/năm
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

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
    <div className="news__comic">
      <div className="slide__title">Truyện mới cập nhật </div>

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
                <div className="update__time">
                  Cập nhật {timeForm(comic.updatedAt)}
                </div>
                {/* <Link className="read__btn" to={`/read/${comic.slug}`}>
                Read
              </Link> */}
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default NewsComic;
