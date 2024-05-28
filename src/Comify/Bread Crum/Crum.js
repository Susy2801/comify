import "./Crum.css";
import anime from "../Asset/crum.png";

function Crum() {
  return (
    <a href="#!">
      <div className="crum__container">
        <img alt="crum" src={anime} className="crum__img" />
        <div className="crum__text right"></div>
        <div className="bubble"></div>
        <div className="bubble b2"></div>
      </div>
    </a>
  );
}

export default Crum;
