import "./Read.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Read() {
  const { id } = useParams();
  var readApi = `https://otruyenapi.com/v1/api/truyen-tranh/${id}`;
  const [comic, getComic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");

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

  if (!loading) {
    return (
      <div className="comic__container">
        <div className="comic__info">
          <img
            alt="thumb"
            src={`https://img.otruyenapi.com/uploads/comics/${comic.data.item.thumb_url}`}
          />

          <h3>{comic.data.item.name}</h3>
          <h3>{content.replace(/<p[^>]*>|<\/p>/g, "")}</h3>
        </div>
        <div className="comic__read">
          <Link>Đọc Truyện</Link>
        </div>
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
