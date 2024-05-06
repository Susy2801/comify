import "./Search.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SearchPage() {
  const { id } = useParams();
  const searchApi = `https://otruyenapi.com/v1/api/tim-kiem?keyword=${id}`;

  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    var searching = async () => {
      const response = await fetch(searchApi);
      const data = await response.json();
      setSearchData(data.data.items);
      setIsLoading(true);
      console.log(data.data.items);
    };
    searching();
  }, [searchApi]);

  if (isLoading) {
    return (
      <div>
        <div className="test">
          {searchData.map((comic, index) => (
            <div key={index}>
              <img
                src={`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`}
              />
              <div>{comic.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div>LOADING.....</div>;
  }
}

export default SearchPage;
