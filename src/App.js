import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Comify/Navbar/Navbar";
import HomePage from "./Comify/Home Page/Home";
import ReadPage from "./Comify/Reading/Read";
import SearchPage from "./Comify/Search/Search";
import Crum from "./Comify/Bread Crum/Crum";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/read/:id" element={<ReadPage />} />
        <Route path="/search/:id" element={<SearchPage />}></Route>
      </Routes>
      <Crum />
    </div>
  );
}

export default App;
