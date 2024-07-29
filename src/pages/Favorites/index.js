import { useEffect, useState } from "react";
import "./favorites.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const list = localStorage.getItem("@movieflix");
    setMovies(JSON.parse(list) || []);
  }, []);

  function handleRemoveMovie(id) {
    let filterMovies = movies.filter((item) => {
      return item.id !== id;
    });
    setMovies(filterMovies);
    localStorage.setItem("@movieflix", JSON.stringify(filterMovies));
    toast.success("Movie successfully deleted.");
  }

  return (
    <div className="my-movies">
      <h1>My Movies</h1>

      {movies.length === 0 && (
        <span style={{ color: "red" }}>You don't have any movies saved!</span>
      )}

      <ul>
        {movies.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/movie-details/${item.id}`}>See Details</Link>
                <button onClick={() => handleRemoveMovie(item.id)}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
