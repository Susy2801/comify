import "./RightBar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function RightBar() {
  const commingUpApi = "https://otruyenapi.com/v1/api/danh-sach/truyen-moi";
  const [upComics, setUpComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    var fetchCommingUp = async () => {
      const response = await fetch(commingUpApi);
      const data = await response.json();
      setUpComics(data.data.items);
      setIsLoading(false);
      console.log(upComics);
    };
    fetchCommingUp();
  }, [commingUpApi]);

  if (!isLoading) {
    return (
      <div className="side__container">
        <div className="side__main">
          <div className="side__title"> HOT 🔥</div>
          <div className="categories">
            {upComics.map((comic, index) => (
              <div className="comming__comic" key={index}>
                <img
                  className="comming__img"
                  alt="comming-up-next"
                  src={`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`}
                />
                <Link to={`/read/${comic.slug}`}>{comic.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>LOADING...</div>;
  }
}

export default RightBar;
