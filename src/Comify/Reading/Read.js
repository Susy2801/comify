import "./Read.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RightBar from "../Right bar/RightBar";

function Read() {
  const { id } = useParams();
  var readApi = `https://otruyenapi.com/v1/api/truyen-tranh/${id}`;
  const [comic, getComic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [tab, setTab] = useState(1);

  useEffect(() => {
    async function fetchComic() {
      var response = await fetch(readApi);
      var data = await response.json();
      getComic(data);
      setContent(data.data.item.content);
      setLoading(false);
      console.log(data);
    }

    fetchComic();
  }, []);

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

  function handleTab1() {
    setTab(1);
  }

  function handleTab2() {
    setTab(2);
  }

  if (!loading) {
    return (
      <div className="comic__container">
        <div className="comic__main--info">
          <div className="comic__info">
            <img
              className="info__img"
              alt="thumb"
              src={`https://img.otruyenapi.com/uploads/comics/${comic.data.item.thumb_url}`}
            />

            <div className="info__title">
              <div className="read__name">{comic.data.item.name}</div>
              <div className="read__author">
                Tác giả: <span>{comic.data.item.author}</span>
              </div>
              <div className="read__updateTime">
                {timeForm(comic.data.item.updatedAt)}
              </div>
              <div className="info__category">
                {comic.data.item.category.map((type, index) => (
                  <div className="each__category" key={index}>
                    {type.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="more__info">
            <div className="more__tabs">
              <div
                className="tab"
                onClick={() => {
                  handleTab1();
                }}
                style={
                  tab == 1
                    ? { backgroundColor: "rgb(248, 125, 145)" }
                    : { backgroundColor: "" }
                }
              >
                Đọc Truyện
              </div>
              <div
                className="tab"
                onClick={() => {
                  handleTab2();
                }}
                style={
                  tab == 2
                    ? { backgroundColor: "rgb(248, 125, 145)" }
                    : { backgroundColor: "" }
                }
              >
                Thông tin
              </div>
            </div>
            <div className="tabs__info">
              {tab === 1 ? (
                <div className="tab__1">
                  <div>ĐỌC TRUYỆN</div>
                </div>
              ) : (
                <div className="tab__2">
                  <h3>{content.replace(/<p[^>]*>|<\/p>/g, "")}</h3>
                </div>
              )}
            </div>
          </div>
        </div>
        <RightBar />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
}

export default Read;
