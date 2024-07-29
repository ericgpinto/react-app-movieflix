import { useEffect, useState } from "react";
import "./favorites.css";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const list = localStorage.getItem("@movieflix");
    setMovies(JSON.parse(list) || []);
  }, []);

  function handleRemoveMovie() {}

  return (
    <div className="my-movies">
      <h1>My Movies</h1>

      <ul>
        {movies.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/movie-details/${item.id}`}>See Details</Link>
                <button onClick={handleRemoveMovie}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
